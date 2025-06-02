import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {createArticleAPI} from '@/api/artilcle'
import { useEffect, useState } from 'react';
import {useChnnels} from '@/hooks/useChannel'
import {getInfoBack} from '@/api/artilcle'

const { Option } = Select

const Publish = () => {
  const {channelLists}= useChnnels()
  //表单数据上传
  const [imageList,setImageList] = useState([])
  const onFinish = (formValue) => {
    console.log(formValue)
    const {title,content,channel_id} = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: radioIndex,
        images: []
      },
      channel_id
    }
    createArticleAPI(reqData)
  }
  const onUploadChange = (value) => {
    setImageList(value)
    console.log(imageList)
    // setTimeout(() => {
    //   const newIamgesUrl = imageList.fileList.map(item => item.thumbUrl)
    //   console.log('dizhi'+ newIamgesUrl)
    // },5000)
  }
  const [radioIndex,setRadioIndex] = useState(0)
  const radioChange = (e) => {
    setRadioIndex(e.target.value)
  }
  //回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')//id参数名
  //获取Form实例
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticleDetail() {
      const res =await getInfoBack(articleId)
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type
      })
      setRadioIndex(res.data.cover.type)
      setImageList(res.data.cover.images.map(url => {
        return {url}
      }))
    }
    if(articleId) {
      getArticleDetail()
    }
  },[articleId,form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelLists.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {radioIndex > 0 && 
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}  //后端返回的地址
                onChange={onUploadChange}
                maxCount={radioIndex}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            } 
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish