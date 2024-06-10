import {FC, useState} from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
  text?: string;
};

const { TextArea } = Input;



const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Translate: FC = () => {
  const [result, setResult] = useState('');

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setResult('');
      const response = await fetch('http://127.0.0.1:8000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: values.text }) // Assuming 'text' is the form field name
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Translated text:', data.translated_text);
      setResult(data.translated_text);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Text to translate to malay"
          name="text"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <TextArea rows={4} value={result}/>
    </>
  )
}

export default Translate;
