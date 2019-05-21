import { writable } from 'svelte/store';

const defaultRoles = {
	design: true,
	development: true
};

export const roles = writable(defaultRoles);

export const resetRoles = () => {
	roles.set(defaultRoles);
};
