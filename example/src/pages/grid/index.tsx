import { defineComponent, ref } from 'vue'

import { Scaffold } from 'components/scaffold'
import { Row } from 'components/row'
import { Col } from 'components/col'

export default defineComponent({
  name: 'ButtonPage',
  setup() {
    const progress = ref(0)

    setInterval(() => {
      if (progress.value === 24) {
        progress.value = 0
      } else {
        progress.value += 1
      }
    }, 1000 / 5)

    return () => (
      <Scaffold loading={false}>
        <Scaffold.Body shrink>
          <view class="text-secondary text-md m-3">基础栅栏</view>
          <view class="bg-container p-4">
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-24
                </view>
              </Col>
              <Col span={12}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-12
                </view>
              </Col>
              <Col span={12}>
                <view class="text-md bg-primary text-center text-white">
                  col-12
                </view>
              </Col>
              <Col span={8}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-8
                </view>
              </Col>
              <Col span={8}>
                <view class="text-md bg-primary text-center text-white">
                  col-8
                </view>
              </Col>
              <Col span={8}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-8
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
            </Row>
          </view>
          <view class="text-secondary text-md m-3">区块间隔</view>
          <view class="bg-container p-4">
            <view class="mb-1 font-semibold">Horizontal</view>
            <Row gutter={12}>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
            </Row>
            <view class="mb-1 mt-2 font-semibold">Vertical</view>
            <Row gutter={[12, 12]}>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6
                </view>
              </Col>
              <Col span={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6
                </view>
              </Col>
            </Row>
          </view>
          <view class="text-secondary text-md m-3">左右偏移</view>
          <view class="bg-container p-4">
            <Row gutter={[0, 12]}>
              <Col span={8}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-8
                </view>
              </Col>
              <Col span={8} offset={8}>
                <view class="text-md bg-primary text-center text-white">
                  col-8
                </view>
              </Col>
              <Col span={6} offset={6}>
                <view class="text-md bg-primary/60 text-center text-white">
                  col-6 col-offset-6
                </view>
              </Col>
              <Col span={6} offset={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-6 col-offset-6
                </view>
              </Col>
              <Col span={12} offset={6}>
                <view class="text-md bg-primary text-center text-white">
                  col-12 col-offset-6
                </view>
              </Col>
            </Row>
          </view>
          <view class="text-secondary text-md m-3">排版</view>
          <view class="bg-container p-4">
            <view class="mb-1 font-semibold">sub-element align left</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="start">
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">sub-element align center</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="center">
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">sub-element align right</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="end">
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">
              sub-element monospaced arrangement
            </view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="space-between">
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">sub-element align full</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="space-around">
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">sub-element align full</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="space-evenly">
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
          </view>
          <view class="text-secondary text-md m-3">对齐</view>
          <view class="bg-container p-4">
            <view class="mb-1 font-semibold">align top</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="center" align="top">
                <Col span={4}>
                  <view class="text-md bg-primary/60 h-10 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary h-6 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 h-14 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary h-8 text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">align middle</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="space-around" align="middle">
                <Col span={4}>
                  <view class="text-md bg-primary/60 h-10 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary h-6 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 h-14 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary h-8 text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
            <view class="mb-1 font-semibold">align bottom</view>
            <view class="bg-layout mb-2 p-1">
              <Row justify="space-between" align="bottom">
                <Col span={4}>
                  <view class="text-md bg-primary/60 h-10 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary h-6 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary/60 h-14 text-center text-white">
                    col-4
                  </view>
                </Col>
                <Col span={4}>
                  <view class="text-md bg-primary h-8 text-center text-white">
                    col-4
                  </view>
                </Col>
              </Row>
            </view>
          </view>
          <view class="text-secondary text-md m-3">Flex 填充</view>
          <view class="bg-container p-4">
            <view class="mb-1 font-semibold">percentage columns</view>
            <Row>
              <Col flex={2}>
                <view class="text-md bg-primary/60 text-center text-white">
                  2 / 5
                </view>
              </Col>
              <Col flex={3}>
                <view class="text-md bg-primary text-center text-white">
                  3 / 5
                </view>
              </Col>
            </Row>
            <view class="mb-1 mt-2 font-semibold">fill rest</view>
            <Row>
              <Col flex="60px">
                <view class="text-md bg-primary/60 text-center text-white">
                  60px
                </view>
              </Col>
              <Col flex="auto">
                <view class="text-md bg-primary text-center text-white">
                  auto
                </view>
              </Col>
            </Row>
            <view class="mb-1 mt-2 font-semibold">raw flex style</view>
            <Row>
              <Col flex="1 1 100px">
                <view class="text-md bg-primary/60 text-center text-white">
                  1 1 100px
                </view>
              </Col>
              <Col flex="0 1 60px">
                <view class="text-md bg-primary text-center text-white">
                  0 1 60px
                </view>
              </Col>
            </Row>
            <Row class="mt-2" wrap={false}>
              <Col flex="none">
                <view class="text-md bg-primary/60 text-center text-white">
                  none
                </view>
              </Col>
              <Col flex="auto">
                <view class="text-md bg-primary text-center text-white">
                  auto with no-wrap
                </view>
              </Col>
            </Row>
          </view>
        </Scaffold.Body>
      </Scaffold>
    )
  },
})
