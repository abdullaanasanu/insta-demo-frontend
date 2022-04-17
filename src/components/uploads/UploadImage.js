import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file, type) {
  if (type === "video") {
    return true;
  }
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class UploadImage extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    //   console.log();
      this.props.onChange(info.file.response.file)
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={process.env.REACT_APP_BACKEND_API + "upload"}
        beforeUpload={(file) => beforeUpload(file, this.props.type)}
        onChange={this.handleChange}
      >
        {this.props.type === 'video' ?
          <>{imageUrl ? <p>Uploaded</p> : uploadButton}</>
        :
        <>{imageUrl && this.props.value !== "" ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</>
        }
        
      </Upload>
    );
  }
}
