import { Contributor, Brain } from "@honeycomb-app/hexacore"
import { z } from "zod"

export class ProductOwner extends Contributor {
  name = "ProductOwner"
  brain = Brain.GPT_41_NANO

  thoughtShape = z.object({
    refinedTask: z.object({
      title: z.string(),
      description: z.string()
    }),
  })

  constructor(private changeRequest: string) {
    super()
  }

  loadContext(): string {
    return `You receive this user change request:\n${this.changeRequest}\nCreate a clear task with title and description.`
  }

  async afterThought(thought: z.infer<typeof this.thoughtShape>) {
    // Delegate the refined task to Developer
    const implementation = await this.delegateTo("Developer", thought.refinedTask)
    return { refinedTask: thought.refinedTask, implementation }
  }
}