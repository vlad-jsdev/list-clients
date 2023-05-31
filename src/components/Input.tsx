import { ChangeEvent, FC } from "react"
import { INPUTS, SEARCH_PLACEHOLDER } from "../constants/form"

interface IProps {
	handlerChange: (e: ChangeEvent<HTMLInputElement>) => void
	val?: string | boolean
	type: string
	name?: string
	isCheckbox?: boolean
}

const Input: FC<IProps> = ({ handlerChange, val, type, name, isCheckbox }) => {
	const wrapStyles = !isCheckbox ? "form__group field" : isCheckbox && val ? 'check__status input__checked' : 'check__status'
	const inputValue = typeof val === 'boolean' ? val.toString() : val;

	return (
		<div className={wrapStyles}>
			<input onChange={handlerChange}
				checked={isCheckbox && typeof val === 'boolean' &&  val}
				value={!isCheckbox ? inputValue : ''}
				type={type}
				className={!isCheckbox ? "form__field" : ''}
				placeholder={name}
				name={name}
				id={name} />
			<label htmlFor={name}
				className={!isCheckbox ? "form__label" : ''}>
				{name === INPUTS.SEARCH ? SEARCH_PLACEHOLDER : name}
			</label>
		</div>
	)
}
export default Input
