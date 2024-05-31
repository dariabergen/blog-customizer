import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	title: 'Components/ArrowButton',
	component: ArrowButton,
	argTypes: {
		isOpen: { control: 'boolean' }, 
		handler: { action: 'clicked' }, 
	},
};

export default meta;

type Story = StoryObj<typeof ArrowButton>;

export const Default: Story = {
	args: {
		isOpen: false,
		handler: () => {
			console.log(true);
		},
	},
};