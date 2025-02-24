import Form from "../components/Forms";

function Register() {
    // set the route we are trying to send request to
    // specifying method we are performing
    return <Form route="/api/user/register/" method="register"/>;
}

export default Register;