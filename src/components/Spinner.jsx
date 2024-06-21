import { LoaderIcon } from "../icons";

export default function Spinner({ transparent }) {
    return (
        <>
            <div className={`fixed inset-0 bg-white z-40 ${transparent ? 'opacity-70' : ''}`}>
                <div className="fixed z-50 inset-0 flex justify-center items-center animate-spin">
                    <LoaderIcon className="fill-blue-600" />
                </div>
            </div>
        </>
    )
}
