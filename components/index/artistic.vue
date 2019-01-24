<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{ active:kind === 'all' }"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{ active:kind === 'part' }"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{ active:kind === 'spa' }"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{ active:kind === 'movie' }"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{ active:kind === 'travel' }"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item, index) in cur"
        :key="index">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      kind: 'all',
      list: {
        all: [{
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }],
        part: [{
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }],
        spa: [{
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }],
        movie: [{
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }],
        travel: [{
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }, {
          title: '原牛道牛肉火锅',
          pos: '海鲜自助料理',
          price: Math.ceil(Math.random() * 400),
          img: '//p0.meituan.net/mogu/fc091566222b23c51857ab4316633e43370925.jpg@368w_208h_1e_1c',
          url: '//abc.com'
        }]
      }
    }
  },
  computed: {
    cur() {
      return this.list[this.kind]
    }
  },
  methods: {
    over(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
