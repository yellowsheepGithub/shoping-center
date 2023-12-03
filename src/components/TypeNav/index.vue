<template>
  <!--全局组件放在components文件夹中 -->
  <div>
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveShow" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <div class="sort" v-show="isShow">
              <div class="all-sort-list2" @click="goSearch($event)">
                <!-- 下面的：class意思是冒号后面的条件成立时给相应元素添加cur样式  -->
                <!-- 给item动态添加样式最简单的方式是通过css样式设置item:hover，这里是练习js实现 -->
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: currentIndex === index }"
                >
                  <h3>
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-categoryId="c1.category1Id"
                    >
                      {{ c1.categoryName }}
                    </a>
                  </h3>
                  <!-- 最简单方式：css，这里练习用js控制二三级联动的显示和隐藏 -->
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex === index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                          >
                            {{ c2.categoryName }}
                          </a>
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                            >
                              {{ c3.categoryName }}
                            </a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

//按需引入lodash库中的throggle函数实现节流效果
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  methods: {
    //函数节流，这里的函数回调不要写成箭头函数，不然this的指向会有问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    goSearch(event) {
      //点击三级联动上面的a标签跳转到search组件的同时传递参数
      //两个最难解决的问题：1.怎么知道点击的是a标签，2.怎么知道点击的是几级联动
      //最好的解决办法是事件委托加编程式导航加自定义属性
      //不用声明式导航的原因，因为声明式导航是一个组件，如果用的是声明式导航vue在渲染页面的时候就会一次产生很多vc实例，导致页面卡顿
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      //只有a标签上有自定义属性categoryName
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        //路由跳转
        this.$router.push(location);
      }
    },
    enterShow() {
      this.isShow = true;
    },
  },
  //这一块vuex和请求数据的操作算是一个难点
  mounted() {
    //通知vuex发请求，获取数据，存储在仓库中
    //这里涉及到一个性能优化问题，如果下面这行代码放在这个组件中，
    //那么每当有组件用到typenav这个组件时都会发起一起网络请求，这样性能就低了
    //如果把这行代码放在app也就是根组件中，那网络请求只会发生一次，当组件需要用到请求的数据时在仓库中进行提取即可
    // this.$store.dispatch("categoryList");

    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    //从仓库中提取categoryList
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据,state是形参
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    //过渡动画开始状态
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
.cur {
  background-color: skyblue;
}
</style>