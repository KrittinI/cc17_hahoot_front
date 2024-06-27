import { useState } from 'react'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import EditProfileForm from './EditProfileForm'

export default function EditProfileBox() {
    const [open, setOpen] = useState(false)
    return (
        <div className="pt-2">
            <Button bg={`black`} width={40} onClick={() => setOpen(true)}>Edit Profile</Button>
            <Modal title={`Edit Your Profile`} open={open} onClose={() => setOpen(false)}>
                <EditProfileForm onSuccess={() => setOpen(false)} />
            </Modal>
        </div>
    )
}
