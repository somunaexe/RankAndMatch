const ConfirmModal = ({isOpen, interestKey, children}) => {
    if(!isOpen) return
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-black-600 p-6 rounded shadow-lg w-100">
                {children}
            </div>
        </div>
    )
}

export default ConfirmModal