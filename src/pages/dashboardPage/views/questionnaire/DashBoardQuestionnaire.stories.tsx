import DashBoardQuestionnaire from "@/pages/dashboardPage/questionnaire";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DashBoardQuestionnaire> = {
  title: "pages/dashboard/views/DashBoardQuestionnaire",
  component: DashBoardQuestionnaire,
  tags: ["autodocs"],
  //   argTypes: {
  //     onClick: { action: "clicked" },
  //   },
};

export default meta;

type Story = StoryObj<typeof DashBoardQuestionnaire>;

export const DashBoardQuestionnaireTest: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/hY76phjdEqYFydjyfkajtW/Retail?node-id=465-202&t=MnPdSfKrSa6KuTGV-4",
    },
  },
};
