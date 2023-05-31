import { IClients } from "../types/interfaces";

export const mockClients: IClients = {
	clients: [
		{
			id: 1,
			email: 'vlad@dot.com',
			name: 'vlad',
			birth: '1995-06-20',
			status: 'ACTIVE'
		},
		{
			id: 2,
			email: 'anna@dot.com',
			name: 'Anna',
			birth: '2000-06-28',
			status: 'BLOCKED'
		},
		{
			id: 3,
			email: 'email@gmail.com',
			name: 'Vasya',
			birth: '1993-01-02',
			status: 'ACTIVE'
		}
	],
}
