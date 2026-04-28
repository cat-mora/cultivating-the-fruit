That sounds right. The process is now much safer.

Things to check before testing:

1. **Webhook must only fire `purchase_completed` after confirmed payment**
   Not on checkout start, not on OTO purchase alone.

2. **Webhook order matters**
   This is correct:

   ```js
   await loopsUpsertContact(...)
   await send purchase_completed event
   ```

   because the contact property `getAppUrl` needs to exist before the onboarding loop email sends.

3. **Day 1 and Day 3 should both trigger from `purchase_completed`**
   Good. That avoids abandoned checkout people getting onboarding emails.

4. **Abandoned checkout should stay on `checkout_started`**
   Good.

5. **Check event name spelling exactly**
   Loops trigger and webhook must both use:

   ```js
   purchase_completed
   ```

6. **Check `getAppUrl` is both a contact property and event property**
   Contact property matters for loop emails. Event property matters only if that email uses event data.

7. **Queued Day 3 contact**
   Claude’s note sounds plausible. Leave them alone. They may still receive Day 3 from the old queue.

8. **Big final test**
   Do one AU$19 live/test purchase and check:

   * welcome email arrives
   * invite code appears
   * Get App link includes the same code
   * Day 1 loop contact is queued/sent
   * Day 3 loop contact is queued
   * abandoned checkout does not receive onboarding

Biggest risk now: **webhook fires `purchase_completed` before Loops contact properties are saved, or uses a slightly different event name.**
