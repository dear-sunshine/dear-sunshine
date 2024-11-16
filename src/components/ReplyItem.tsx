'use client';

import { useRouter } from 'next/navigation';
import { deleteReply } from '@/lib/dbActions';
import { Reply } from '@prisma/client';
import { ListGroup, Dropdown, Row, Col } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';

const ReplyItem = ({ reply }: { reply: Reply }) => {
  // used to refresh page after deleting a reply
  const router = useRouter();

  const confirmDelete = async () => {
    try {
      await deleteReply(reply.id);
      swal('Success', 'Reply deleted successfully', 'success');
      router.refresh();
    } catch (error) {
      swal('Error', 'There was an error deleting the reply', 'error');
    }
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <p className="fw-lighter">{reply.createdAt.toLocaleDateString('en-US')}</p>
        </Col>

        <Col>
          <Dropdown>
            <Dropdown.Toggle
              variant="transparent"
              style={{ marginLeft: '140px', marginTop: '-5px', color: 'darkgray' }}
            >
              <ThreeDots />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={confirmDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <p>{reply.reply}</p>
      </Row>
    </ListGroup.Item>
  );
};

export default ReplyItem;
