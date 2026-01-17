export type LoginFormData = {
	email: string;
	password: string;
};

export type LoginFormState = {
	success: boolean;
	message?: string;
	data?: Partial<LoginFormData>;
};
