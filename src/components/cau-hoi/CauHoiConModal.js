import React, { useState } from 'react';
import { Button, Modal, Input, Radio } from 'antd';
import { InputLabel, Select, MenuItem }from '@mui/material'

function CauHoiConModal({number, getCauHoi}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueRadio, setValueRadio] = useState(1);
  const [valueSelect, setValueSelect] = useState(1);
  const [ques, setQues] = useState('')
  const [ans1, setAns1] = useState('')
  const [ans2, setAns2] = useState('')
  const [ans3, setAns3] = useState('')
  const [ans4, setAns4] = useState('')
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleQuestion = (event) => {
    setQues(event.target.value)
  }
  const handleAns1 = (event) => {
    setAns1(event.target.value)
  }
  const handleAns2 = (event) => {
    setAns2(event.target.value)
  }
  const handleAns3 = (event) => {
    setAns3(event.target.value)
  }
  const handleAns4 = (event) => {
    setAns4(event.target.value)
  }
  const handleOk = () => {
    const Option_ans = [ans1, ans2, ans3, ans4]
    const True_Ans = Option_ans[valueRadio-1]
    let temp = `{
      \"S_Ques${number}\": [{
        \"Content_Question\":\"${ques}\",
        \"Level\": \"${valueSelect}\",
        \"Option_ans\":[\"${ans1}\", \"${ans2}\", \"${ans3}\", \"${ans4}\"],
        \"True_Ans\": \"${True_Ans}\"
      }]
    }`
    const cauHoi = JSON.parse(temp)
    getCauHoi(cauHoi)
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value)
  }
  const onChangeSelect = (event) => {
    setValueSelect(event.target.value)
  }
  return (
    <>
      <Button onClick={showModal} type="primary">{`Câu hỏi nhỏ số ${number}`}</Button>
      <Modal title={`Câu hỏi nhỏ số ${number}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InputLabel>Level</InputLabel>
        <Select
          placeholder="Level"
          value={valueSelect}
          onChange={onChangeSelect}
          style={{
            width: 120,
            height: 30
          }}
        >
          <MenuItem value = {1}>1</MenuItem>
          <MenuItem value = {2}>2</MenuItem>
          <MenuItem value = {3}>3</MenuItem>
          <MenuItem value = {4}>4</MenuItem>
          <MenuItem value = {5}>5</MenuItem>
        </Select>
        <br />
        <br />

        <label htmlFor="">Nội dung câu hỏi <span style={{color: 'red'}}>*</span></label>
        <Input placeholder="*Nhập tên câu hỏi" onChange={handleQuestion} required/>
        <br />
        <br />
        <Radio.Group onChange={onChangeRadio} value={valueRadio}>
          <Radio value={1}>
            <label htmlFor="" >Câu trả lời 1</label>
            <Input onChange={handleAns1}/>
          </Radio>
          <Radio value={2}>
            <label htmlFor="" >Câu trả lời 2</label>
            <Input onChange={handleAns2}/>
          </Radio>
          <Radio value={3}>
            <label htmlFor="" >Câu trả lời 3</label>
            <Input onChange={handleAns3}/>
          </Radio>
          <Radio value={4}>
            <label htmlFor="" >Câu trả lời 4</label>
            <Input onChange={handleAns4}/>
          </Radio>
        </Radio.Group>
      </Modal>
    </>
  )
}

export default CauHoiConModal