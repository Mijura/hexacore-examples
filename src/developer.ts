import { Brain, Contributor } from "@honeycomb-app/hexacore"
import { z } from "zod"

export class Developer extends Contributor {
  name = "Developer"
  brain = Brain.GPT_41

  thoughtShape = z.object({
    implementationPlan: z.string()
  })

  private task: { title: string; description: string } | null = null

  async preThought(task: { title: string; description: string }) {
    this.task = task
  }

  loadContext(): string {
    return `You are a developer. Based on the project details below, create an implementation plan:\n${JSON.stringify(this.task)}`
  }

  async afterThought(thought: z.infer<typeof this.thoughtShape>) {
    return thought.implementationPlan
  }
}