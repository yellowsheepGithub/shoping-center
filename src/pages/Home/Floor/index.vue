<template>
  <div>
    <div class="floor">
      <div class="py-container">
        <div class="title clearfix">
          <h3 class="fl">{{ list.name }}</h3>
          <div class="fr">
            <ul class="nav-tabs clearfix">
              <li
                class="active"
                v-for="(nav, index) in list.navList"
                :key="index">
                <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content">
          <div class="tab-pane">
            <div class="floor-1">
              <div class="blockgary">
                <ul class="jd-list">
                  <li v-for="(keyword, index) in list.keywords" :key="index">
                    {{ keyword }}
                  </li>
                </ul>
                <img :src="list.imgUrl" />
              </div>
              <div class="floorBanner">
                <div class="swiper-container" ref="floor1Swiper">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="carousel in list.carouselList"
                      :key="carousel.id">
                      <img :src="carousel.imgUrl" />
                    </div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-pagination"></div>

                  <!-- 如果需要导航按钮 -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </div>
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[0]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[1]" />
                </div>
              </div>
              <div class="split center">
                <img :src="list.bigImg" />
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[2]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="list.recommendList[3]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Floor",
  props: ["list"],
  mounted() {
    console.log(this);
    let mySwiper = new Swiper(this.$refs.floor1Swiper, {
      //设置轮播图防线
      direction: "horizontal",
      //开启循环模式
      loop: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        //分页器类型
        type: "bullets",
        //点击分页器，切换轮播
        clickable: true,
      },
      //自动轮播
      // autoplay: {
      //   delay: 1000,
      //   //新版本的写法：目前是5版本
      //   // pauseOnMouseEnter: true,
      //   //如果设置为true，当切换到最后一个slide时停止自动切换
      //   stopOnLastSlide: true,
      //   //用户操作swiper之后，是否禁止autoplay
      //   disableOnInteraction: false,
      // },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      //切换效果
      // effect: "cube",
    });
  },
};
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
