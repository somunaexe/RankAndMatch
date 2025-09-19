const UnauthConsent = ({err}) => {
    return (
        <div className="text-center p-10">
            <h1 className="text-2xl font-bold text-red-500">Invalid or expired link</h1>
            {err && <p className="text-white-600">{err?.message || String(err)}</p>}
            <p className="text-white-600">What are you doing here?🤔</p>
            <p className='text-white-600'>Please request a new invitation to fill out the consent form.</p>
        </div>
    )
}

export default UnauthConsent