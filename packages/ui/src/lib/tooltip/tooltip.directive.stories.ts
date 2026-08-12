import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from '../button/button.component';
import { BadgeCheckIconComponent } from '../icons/badge-check.component';
import { BuildingIconComponent } from '../icons/building.component';
import { MapPinIconComponent } from '../icons/map-pin.component';
import { TooltipDirective } from './tooltip.directive';
import { TOOLTIP_KNOBS } from './tooltip.directive.knobs';

const meta: Meta<TooltipDirective> = {
  title: 'Components/Tooltip',
  component: TooltipDirective,
  tags: ['autodocs'],
  argTypes: TOOLTIP_KNOBS.argTypes,
  args: TOOLTIP_KNOBS.args,
};

export default meta;
type Story = StoryObj<TooltipDirective>;

export const Playground: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent, TooltipDirective],
    },
    template: `
      <div class="sb-tooltip-story">
        <ea-button eaTooltip="This is a tooltip" variant="secondary">Hover me</ea-button>
      </div>
    `,
    styles: [
      `
        .sb-tooltip-story {
          display: flex;
          justify-content: center;
          padding: 64px;
        }
      `,
    ],
  }),
};

export const TemplateContent: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [
        BadgeCheckIconComponent,
        BuildingIconComponent,
        ButtonComponent,
        MapPinIconComponent,
        TooltipDirective,
      ],
    },
    template: `
      <div class="sb-tooltip-story">
        <ng-template #tip>
          <div class="sb-tooltip-tip">
            <div class="sb-tooltip-tip__header">
              <img class="sb-tooltip-tip__avatar" alt="" src="demo-avatar.png" />
              <div class="sb-tooltip-tip__identity">
                <span class="sb-tooltip-tip__name">
                  Bob Vance
                  <ea-icon-badge-check class="sb-tooltip-tip__verified" />
                </span>
                <span class="sb-tooltip-tip__role">Vance Refrigeration</span>
              </div>
            </div>
            <div class="sb-tooltip-tip__meta">
              <span class="sb-tooltip-tip__meta-row">
                <ea-icon-building class="sb-tooltip-tip__meta-icon" />
                Dunder Mifflin
              </span>
              <span class="sb-tooltip-tip__meta-row">
                <ea-icon-map-pin class="sb-tooltip-tip__meta-icon" />
                Scranton, PA
              </span>
              <span class="sb-tooltip-tip__meta-row">
                <span class="sb-tooltip-tip__status-dot" aria-hidden="true"></span>
                Online now
              </span>
            </div>
          </div>
        </ng-template>
        <ea-button [eaTooltip]="tip" tooltipPosition="bottom" [maxWidth]="300" variant="secondary">Hover me</ea-button>
      </div>
    `,
    styles: [
      `
        .sb-tooltip-story {
          display: flex;
          justify-content: center;
          padding: 64px;
        }

        .sb-tooltip-tip {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 4px 2px;
        }

        .sb-tooltip-tip__header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sb-tooltip-tip__avatar {
          width: 36px;
          height: 36px;
          border: 2px solid var(--color-brand-default);
          border-radius: 50%;
        }

        .sb-tooltip-tip__identity {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sb-tooltip-tip__name {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          white-space: nowrap;
        }

        .sb-tooltip-tip__verified {
          color: var(--color-info-default);
        }

        .sb-tooltip-tip__role {
          opacity: 0.75;
          white-space: nowrap;
        }

        .sb-tooltip-tip__meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 12px;
          border-top: var(--border-width-thin) solid var(--color-tooltip-border);
        }

        .sb-tooltip-tip__meta-row {
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .sb-tooltip-tip__meta-icon {
          color: var(--color-warning-default);
        }

        .sb-tooltip-tip__status-dot {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1em;
          height: 1em;
        }

        .sb-tooltip-tip__status-dot::before {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-success-default);
          content: '';
        }
      `,
    ],
  }),
};

// A phone-sized viewport against content that fits neither dimension: the bubble
// stops at the viewport margin on all four sides and scrolls the rest.
export const ViewportClamped: Story = {
  globals: { viewport: { value: '360-640' } },
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent, TooltipDirective],
    },
    template: `
      <div class="sb-tooltip-story">
        <ng-template #details>
          <table class="sb-tooltip-table">
            <caption class="sb-tooltip-table__caption">Shipment SR-40118</caption>
            <tbody>
              <tr><th scope="row">Consignor</th><td>Vance Refrigeration, Scranton</td></tr>
              <tr><th scope="row">Consignee</th><td>Dunder Mifflin Paper Company</td></tr>
              <tr><th scope="row">Origin</th><td>1725 Slough Avenue, Scranton, PA</td></tr>
              <tr><th scope="row">Destination</th><td>34 Chestnut Street, Stamford, CT</td></tr>
              <tr><th scope="row">Service</th><td>Refrigerated, temperature logged</td></tr>
              <tr><th scope="row">Container</th><td>REEF-8841-002 (40ft high cube)</td></tr>
              <tr><th scope="row">Seal</th><td>SL-99204471-A</td></tr>
              <tr><th scope="row">Gross weight</th><td>18,400 kg</td></tr>
              <tr><th scope="row">Pieces</th><td>1,204 cartons on 22 pallets</td></tr>
              <tr><th scope="row">Departed</th><td>Tuesday 04:15, on schedule</td></tr>
              <tr><th scope="row">Last scan</th><td>Allentown hub, inbound sort</td></tr>
              <tr><th scope="row">Due</th><td>Thursday, between 09:00 and 13:00</td></tr>
              <tr><th scope="row">Handler</th><td>Bob Vance</td></tr>
            </tbody>
          </table>
        </ng-template>
        <ea-button [eaTooltip]="details" tooltipPosition="bottom" [maxWidth]="320" variant="secondary">Hover me</ea-button>
      </div>
    `,
    styles: [
      `
        .sb-tooltip-story {
          display: flex;
          justify-content: center;
          padding: 64px;
        }

        .sb-tooltip-table {
          border-spacing: 0;
        }

        .sb-tooltip-table__caption {
          padding-bottom: 8px;
          text-align: start;
          font-weight: var(--font-weight-semibold);
        }

        .sb-tooltip-table th,
        .sb-tooltip-table td {
          padding: 2px 8px 2px 0;
          text-align: start;
          white-space: nowrap;
        }

        .sb-tooltip-table th {
          font-weight: var(--font-weight-medium);
          opacity: 0.75;
        }
      `,
    ],
  }),
};
