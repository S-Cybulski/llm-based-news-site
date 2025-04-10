import "./SignUpForm.css";

const SignUpForm = () => {
    return (
        <div className="sign-up-form-container">
            <h1>Sign Up</h1>
            <form className="sign-up-form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;