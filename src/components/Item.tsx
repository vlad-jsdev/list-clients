import { FC } from "react"
import { useAppDispatch } from '../store/hooks'
import { delClient } from "../store/profileSlice"
import { ReactComponent as EditIcon } from '../assets/icons/edit-svgrepo-com.svg'
import { ReactComponent as DelIcon } from '../assets/icons/delete-svgrepo-com.svg'
import { IClient } from "../types/interfaces"

interface IProps extends IClient  {
	editClient: (id: number) => void
}
const Item: FC<IProps> = ({ id, name, email, birth, status, editClient }) => {
	const dispatch = useAppDispatch()
	const deleteClient = () => {
		dispatch(delClient(id))
	}
	return (
		<tr>
			<td>{name}</td>
			<td>{email}</td>
			<td>{birth}</td>
			<td>{status}</td>
			<td className="td-icons">
				<EditIcon onClick={() => editClient(id)} className="edit icons" />
				<DelIcon onClick={deleteClient} className="del icons" />
			</td>
		</tr>
	)
}

export default Item
