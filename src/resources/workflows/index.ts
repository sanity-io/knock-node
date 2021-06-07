import { Knock } from "../../knock";
import {
  CancelWorkflowProperties,
  TriggerWorkflowProperties,
  WorkflowRun,
} from "./interfaces";

export class Workflows {
  constructor(readonly knock: Knock) {}

  async trigger(
    workflowKey: string,
    {
      actor,
      recipients,
      cancellationKey,
      data: notifyData,
    }: TriggerWorkflowProperties,
  ): Promise<WorkflowRun> {
    if (!workflowKey && !actor && !recipients) {
      throw new Error(
        `Incomplete arguments. At a minimum you need to specify 'workflowKey', 'actor', and 'recipients'.`,
      );
    }

    const { data } = await this.knock.post(
      `/v1/workflows/${workflowKey}/trigger`,
      {
        actor,
        recipients,
        cancellation_key: cancellationKey,
        data: notifyData,
      },
    );

    return data;
  }

  async cancel(
    workflowKey: string,
    cancellationKey: string,
    { recipients }: CancelWorkflowProperties = {},
  ) {
    if (!workflowKey && !cancellationKey) {
      throw new Error(
        `Incomplete arguments. At a minimum you need to specify 'workflowKey' and 'cancellationKey'.`,
      );
    }

    const { data } = await this.knock.post(
      `/v1/workflows/${workflowKey}/cancel`,
      {
        cancellation_key: cancellationKey,
        recipients,
      },
    );

    return data;
  }
}
