import { describe, test } from "vitest";
import { validateMarkdown } from "../testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Input', () => {

  test('single input', async () => {
    const validation = await validateMarkdown(`
        $input runningTorque1 {
          placeholder: 'Fastener 1 torque'
        }
    `)

    expectNoIssues(validation)
  })

})
