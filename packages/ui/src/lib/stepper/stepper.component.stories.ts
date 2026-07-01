import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

import { StepComponent } from './step.component';
import { StepperComponent } from './stepper.component';
import { STEPPER_KNOBS } from './stepper.component.knobs';

const stepperTemplate = (children: string) => `
  <ea-stepper
    [activeStep]="activeStep"
    [linear]="linear"
    [size]="size"
    [disabled]="disabled">
    ${children}
  </ea-stepper>
`;

const meta: Meta<StepperComponent> = {
  title: 'Components/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [StepComponent] })],
  argTypes: STEPPER_KNOBS.argTypes,
  args: {
    ...STEPPER_KNOBS.args,
    activeStep: 0,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

export const Default: Story = {
  render: args => ({
    props: args,
    template: stepperTemplate(`
      <ea-step label="Account">Step 1 — account details.</ea-step>
      <ea-step label="Profile">Step 2 — profile info.</ea-step>
      <ea-step label="Review">Step 3 — review and submit.</ea-step>
    `),
  }),
};

export const WithCompletedSteps: Story = {
  args: { activeStep: 2 },
  render: args => ({
    props: args,
    template: stepperTemplate(`
      <ea-step label="Account" [completed]="true">Account details.</ea-step>
      <ea-step label="Profile" [completed]="true">Profile info.</ea-step>
      <ea-step label="Review">Review and submit.</ea-step>
    `),
  }),
};

export const WithOptionalStep: Story = {
  render: args => ({
    props: args,
    template: stepperTemplate(`
      <ea-step label="Account">Account details.</ea-step>
      <ea-step label="Notifications" [optional]="true">Notification preferences.</ea-step>
      <ea-step label="Review">Review and submit.</ea-step>
    `),
  }),
};
