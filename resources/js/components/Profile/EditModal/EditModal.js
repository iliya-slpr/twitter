import { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert";
class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = { newUsername: "", errors: "" };
        this.submitHandler = this.submitHandler.bind(this);
    }
    submitHandler() {
        axios
            .post(
                "/api/users/edit",
                { name: this.state.newUsername },
                {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        Authorization: `Bearer ${document.cookie.slice(6)}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                if (res.data.status) {
                    swal("Success", "Your profile Updated", "success");
                    this.props.onHide();
                } else {
                    this.setState({ errors: res.data.data.join("") });
                }
            });
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton className="bg-dark">
                    <Modal.Title
                        className="text-white"
                        id="contained-modal-title-lg"
                    >
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Edit Profile</Form.Label>
                            <Form.Control
                                rows={5}
                                onChange={(e) => {
                                    this.setState({
                                        newUsername: e.target.value,
                                    });
                                }}
                            />
                            <span className="text-danger">
                                {this.state.errors}
                            </span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        disabled={
                            this.state.newUsername === "" ||
                            this.state.newUsername === this.props.myname
                                ? true
                                : false
                        }
                        onClick={this.submitHandler}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Dialog;
