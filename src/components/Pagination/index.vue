<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo === 1}">1</button>
    <button v-show="startNumAndEndNum.start > 2">...</button>

    <!-- 暂时不管这个报错 -->
    <!-- v-for也可以遍历数字 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo === page}">{{ page }}</button>
 
    <button v-show="startNumAndEndNum.end < totalPage - 1">...</button>
    <button v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo === totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo === totalPage">下一页</button>
    <button style="margin-left: 30px;">共{{total}}条</button>
    
  </div>
</template>


<script>
export default {
    name:'Pagination',
    props:['pageNo','pageSize','total','continues'],
    computed:{
      //计算出分页器总共的页数
      totalPage(){
        //Math.ceil向上取整
        return Math.ceil(this.total/this.pageSize)
      },
      //计算出连续页数（continues）的起始值和结束值
      startNumAndEndNum(){
        let {continues,pageNo,totalPage} = this
        let start = 0
        let end = 0
        //总页数小于continues
        if(totalPage < continues){
          start = 1
          end = totalPage
        }else{
          //总页数大于continues
          start = pageNo - parseInt(continues / 2)
          end = pageNo + parseInt(continues / 2)
          //不正常情况
          //start不可以是0或者负数
          if(start < 1){
            start = 1
            end = continues
          }
          //end不可以大于总页数
          if(end > totalPage){
            end = totalPage
            start = totalPage - continues + 1
          }
        }
        return {start,end}
      }
    }
}
</script>
<style lang="less" scoped>
.active{
  background-color: skyblue;
}
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>