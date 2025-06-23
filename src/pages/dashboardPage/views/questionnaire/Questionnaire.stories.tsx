import { Meta, StoryObj } from "@storybook/react";
import Questionnaire from ".";

const meta: Meta<typeof Questionnaire> = {
  title: "pages/dashboard/views/DashBoardQuestionnaire",
  component: Questionnaire,
  tags: ["autodocs"],
  //   argTypes: {
  //     onClick: { action: "clicked" },
  //   },
};

export default meta;

type Story = StoryObj<typeof Questionnaire>;

export const DashBoardQuestionnaireTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=465-202&t=MnPdSfKrSa6KuTGV-4",
    },
  },
};
