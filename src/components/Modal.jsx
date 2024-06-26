import { useEffect } from "react"
import { createPortal } from "react-dom"

export default function Modal({ width = 20, title, children, open, onClose }) {
    useEffect(() => {
        const handleEscPress = e => {
            if (e.keyCode === 27) {
                onClose?.()
            }
        }
        document.addEventListener('keydown', handleEscPress)
        return () => document.removeEventListener('keydown', handleEscPress)
    }, [onClose])

    return (
        <>
            {
                open ?
                    createPortal(<>
                        <div className="fixed inset-0 bg-white opacity-40 z-30" ></div>
                        <div className="fixed inset-0 z-40" onMouseDown={onClose}>
                            <div className="flex justify-center items-center min-h-screen" >
                                <div className="bg-white rounded-lg shadow-lg" style={{ width: `${width}rem` }} onMouseDown={e => e.stopPropagation()}>
                                    <div className="flex justify-between items-center p-4">
                                        <button className="invisible">&#10005;</button>
                                        <h5 className="text-font-title">{title}</h5>
                                        <button className="text-red invisible" onClick={onClose}>&#10005;</button>
                                    </div>
                                    <div className="">{children}</div>
                                </div>
                            </div>
                        </div>
                    </>, document.getElementById('modal')) : null
            }
        </>
    )
}
