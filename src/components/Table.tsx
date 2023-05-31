import { ChangeEvent, FC, useEffect, useState } from "react"
import Item from "./Item"
import { useAppSelector } from "../store/hooks"
import Modal from "./Modal"
import { ADD_NEW_CLIENT, EMPTYINFO } from "../constants/client"
import { BIRTHDAY, INPUTS, INPUT_TYPES, OPTIONS_FILTER_DEFAULT } from "../constants/form"
import { ReactComponent as AddIcon } from "../assets/icons/add-svgrepo-com.svg"
import Input from "./Input"
import { OPTIONS } from "../constants/form"
import { IClient, IStatuses } from "../types/interfaces"
import { ReactComponent as ArrowIcon } from "../assets/icons/arrows-up-down-svgrepo-com.svg"

const { NAME, EMAIL, STATUS, SEARCH } = INPUTS
const { ACTIVE, PENDING, BLOCKED } = OPTIONS


const Table: FC = () => {
	const clientsStore = useAppSelector(state => state.clients)
	const [clients, setClients] = useState(clientsStore)
	const [isOpen, setIsOpen] = useState(false)
	const [isSort, setSort] = useState(false)
	const [newClient, setNewClient] = useState(false)
	const [editInfo, setEditInfo] = useState(EMPTYINFO)
	const [statuses, setStatuses] = useState<IStatuses>(OPTIONS_FILTER_DEFAULT)
	useEffect(() => {
		setClients(() => clientsStore.filter((el) => {
			switch (el.status) {
				case ACTIVE:
					return el.status === ACTIVE && statuses.ACTIVE
				case PENDING:
					return el.status === PENDING && statuses.PENDING
				case BLOCKED:
					return el.status === BLOCKED && statuses.BLOCKED
				default:
					return el
			}
		}))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statuses])
	useEffect(() => {
		setClients(clientsStore)
	}, [clientsStore])
	const searchHendler = (e: ChangeEvent<HTMLInputElement>) => {
		setClients(() => clientsStore.filter(el => el.email.includes(e.target.value)))
	}
	const statusesHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setStatuses((prevState) => ({ ...prevState, [e.target.name]: !statuses[e.target.name as keyof IStatuses] }))
	}
	const editClient = (id: number) => {
		const info = clientsStore.filter(el => el.id === id)
		setEditInfo(() => info[0])
		setIsOpen(() => true)
	}
	const addNewClient = () => {
		const newId = clientsStore.length + 1
		setNewClient(() => true)
		setEditInfo(() => ({ ...EMPTYINFO, id: newId }))
		setIsOpen(() => true)
	}
	const sortByName = () => {
		const newSort = [...clients]
		setClients(() => newSort.sort((a, b) => 
			(isSort ? a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)))
		setSort(() => !isSort)
	}
	return (
		<>
			<Input handlerChange={searchHendler} type={INPUT_TYPES.INPUT_T} name={SEARCH} />
			<div className="add-new" onClick={() => addNewClient()}>
				<p>{ADD_NEW_CLIENT}</p>
				<AddIcon className="icons plus" />
			</div>
			<div className="wrap__statuses">
				{Object.keys(OPTIONS_FILTER_DEFAULT).map(el => <Input key={el} handlerChange={statusesHandler} name={el} type={INPUT_TYPES.CHECKBOX_T} isCheckbox={true} val={statuses[el as keyof IStatuses]} />
				)}
			</div>
			<div className="table-wrapper">
				<table className="table table-striped custom-table">
					<thead>
						<tr>
							<th className="arrow-sort">{NAME}<ArrowIcon onClick={() => sortByName()} className="icons" /></th>
							<th>{EMAIL}</th>
							<th>{BIRTHDAY}</th>
							<th>{STATUS}</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((el: IClient) => <Item key={el.id} editClient={editClient} {...el} />)}
					</tbody>
				</table>
			</div>
			{isOpen && <Modal setNewClient={setNewClient} newClient={newClient} setIsOpen={setIsOpen} editInfo={editInfo} />
			}
		</>
	)
}
export default Table
