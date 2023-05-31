export interface IClient {
	id: number,
	email: string,
	name: string,
	birth: string,
	status: string
}

export interface IClients {
  clients: IClient[]
}

export interface IStatuses {
	ACTIVE: boolean,
	PENDING: boolean,
	BLOCKED: boolean
}
