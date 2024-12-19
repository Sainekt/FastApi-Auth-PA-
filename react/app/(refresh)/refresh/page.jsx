export default function Refresh() {
    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '50vh' }}
        >
            <form>
                <div className='mb-3'>
                    <label htmlFor='login' className='form-label'>
                        Login
                    </label>
                    <input
                        type='login'
                        className='form-control'
                        id='login'
                        aria-describedby='emailHelp'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Token
                    </label>
                    <input
                        type='token'
                        className='form-control'
                        id='token'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
}
