export enum notificationStatusEnum {
	sent = 'sent',
	pending = 'pending',
	failed = 'failed'
}

export enum notificationTypeEnum {
	leave_balance_reminder = 'leave-balance-reminder',
	monthly_payslip = 'monthly-payslip',
	happy_birthday = 'happy-birthday',
}

export enum notificationChannel {
	email = 'email',
	ui = 'ui',
}