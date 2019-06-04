import { writable } from 'svelte/store';

const defaultRoles = {
	design: true,
	development: true
};

export const roles = writable(defaultRoles);

export const resetRoles = () => {
	roles.set(defaultRoles);
};

export const activeLink = writable(null);

export const resetActiveLink = () => {
	activeLink.set(null);
};

export const cursorFocused = writable(false);

export const focusCursor = () => {
	cursorFocused.set(true);
};

export const unfocusCursor = () => {
	cursorFocused.set(false);
};
