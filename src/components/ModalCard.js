import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, CustomInput, Button, Row, Col, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import RichTextEditor from 'react-rte';
import Member from '../containers/Member.container'
import Label from '../containers/Label.container'
import Comment from '../containers/Comment.container'
import PropTypes from  'prop-types'
import AddComment from '../containers/AddComment.container';
import DueDate from './DueDate'
import GoogleClient from '../containers/GoogleClient.container'

const ModalCard = ({
  card,
  isOpen,
  allLabels,
  edit,
  openEditCardDesc,
  editCardDesc,
  descEditorState,
  toggleEdit,
  updateCard,
  closeModal
}) => {

  return (
    <div>
    <Modal isOpen={isOpen} toggle={closeModal} >
        <ModalHeader toggle={closeModal}>
          {
            !edit.title && <div onClick={() => toggleEdit(card.id, 'title')}>{card.title}</div>
          }
          {
            edit.title && 
            <Input 
              onBlur={() => toggleEdit(card.id, 'title')} 
              onChange={(e) => updateCard({...card, title: e.target.value})} 
              value={card.title}>
            </Input>
          }
        </ModalHeader>
        <ModalBody className="container-fluid">
          <h5>Due date</h5>
          <h5>
            <DueDate date={card.dueDate} done={card.done}></DueDate>
          </h5>
          <h6>
            <CustomInput type="checkbox" id="doneCheckbox" checked={card.done} onChange={() => {updateCard({...card, done: !card.done})}} label="Done"/>
          </h6>
          <h5>Labels</h5>
          {
            <Row className="pl-3 mb-3">
              {
                card.labels && card.labels.map((label, index) => 
                  <Col xs="auto" className="p-0" key={label} onClick={() => {updateCard({...card, labels: card.labels.filter((id)=> id !== label)})}}>
                    <Label labelId={label}>
                    </Label>
                  </Col>
                )
              }
              <Col xs="auto" className="p-0">
                <Dropdown isOpen={edit.labels} size="sm" toggle={() => toggleEdit(card.id, 'labels')}>
                  <DropdownToggle caret>
                    Add Label
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      allLabels && Object.keys(allLabels).map((key, index) => 
                        <DropdownItem 
                          key={index}
                          value={key}
                          onClick={() => updateCard({...card, labels: [...card.labels, allLabels[key].id]})}
                        >
                          {allLabels[key].title}
                        </DropdownItem>
                      )
                    }
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
          }
          <h5>Description</h5>
          {
            !edit.description && 
            
            <div onClick={() => {toggleEdit(card.id, 'description'); openEditCardDesc(card.description)}} dangerouslySetInnerHTML={{__html: card.description}}></div>
          }
          {
            edit.description && 
            <RichTextEditor 
              value={descEditorState} 
              onChange={(value) => {editCardDesc(value)}}/>
          }
          {
            edit.description && 
            <Button className="mt-2" color="success" onClick={(e) => {toggleEdit(card.id, 'description'); updateCard({...card, description: descEditorState.toString('html')})}}>Save</Button>
          }
          <h5>Attached Files</h5>
          <GoogleClient></GoogleClient>
          <h5>Members</h5>
          <Row className="pl-3 mb-3">
            {
              card.members && card.members.map(member=> 
                <Col xs="2" className="p-2" key={member}>
                  <Member memberId={member}></Member>
                </Col>
              )
            }
          </Row>
          <h5>Comments</h5>
          {
            card.comments && card.comments.map(comment => 
              <Comment commentId={comment.id} content={comment.content} writer={comment.writer} key={comment}></Comment>
            )
          }
          <AddComment card={card}></AddComment>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
    </Modal>
  </div>
)
}

ModalCard.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.bool,
  allLabels: PropTypes.object,
  edit: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func,
  openEditCardDesc: PropTypes.func,
  editCardDesc: PropTypes.func,
  descEditorState: PropTypes.object,
  updateAttribute: PropTypes.func,
  closeModal: PropTypes.func
}

export default ModalCard