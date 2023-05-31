import { ChangeEvent, FC, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addClient, editClient } from "../store/profileSlice";
import { OPTIONS, INPUTS, INPUT_TYPES } from "../constants/form";
import { ReactComponent as CloseIcon } from "../assets/icons/close-lg-svgrepo-com.svg";
import Input from "./Input";
import { IClient } from "../types/interfaces";

const { ACTIVE, PENDING, BLOCKED } = OPTIONS
const { NAME, EMAIL, BIRTH, STATUS } = INPUTS
const { INPUT_T, EMAIL_T, DATE_T } = INPUT_TYPES

interface IProps {
	setIsOpen: (arg: boolean) => void
	editInfo: IClient
	newClient: boolean
	setNewClient: (arg: boolean) => void
}

const Modal: FC<IProps> = ({ setIsOpen, editInfo, newClient, setNewClient }) => {
	const dispatch = useAppDispatch()
	const [info, setInfo] = useState(editInfo)
	const handlerChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
		setInfo((prevState: IClient) => ({ ...prevState, [e.target.name]: e.target.value }))
	}
	const saveChanges = () => {
		if (info.name) {
			newClient ? dispatch(addClient(info)) && setNewClient(false) : dispatch(editClient(info))
			setIsOpen(false)
		}
	}
	console.log(editInfo)
	return (
		<div className="cover-modal">
			<div className="modal">
				<div className="wrap__close" onClick={() => setIsOpen(false)}>
					<CloseIcon  className="close icons"/>
				</div>
				<Input handlerChange={handlerChange} val={info.name} type={INPUT_T} name={NAME} />
				<Input handlerChange={handlerChange} val={info.email} type={EMAIL_T} name={EMAIL} />
				<Input handlerChange={handlerChange} val={info.birth} type={DATE_T} name={BIRTH} />
				<div>
					<select name={STATUS} value={info.status} onChange={handlerChange}>
						<option value={ACTIVE}>{ACTIVE}</option>
						<option value={PENDING}>{PENDING}</option>
						<option value={BLOCKED}>{BLOCKED}</option>
					</select>
				</div>
				<div className="buttons-control">
					<button className='button-c' onClick={saveChanges}>{newClient ? 'Add' : 'Save'}</button>
					<button className='button-c' onClick={() => setIsOpen(false)}>Cancel</button>
				</div>
			</div>

		</div>
	);
};

export default Modal;
