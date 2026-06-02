# Cleanup Before Delivery

Use this reference before claiming a TSLab strategy is ready.

## Remove Before Delivery

Remove or repair:

- auto-added threshold blocks used only for visualization;
- temporary constants that were replaced by inline formulas or parameters;
- debug blocks;
- empty blocks;
- non-working blocks;
- disconnected blocks;
- duplicate helper blocks;
- template leftovers that do not participate in final logic;
- unused panes;
- invalid links from deleted blocks;
- generic `Always` or helper blocks that no longer participate in the final trade path.

## Why This Is Blocking

Temporary visual, threshold, empty, and helper blocks can leave invalid graph links or bad references that cause compilation failures. A strategy that looks mostly correct but contains stale or non-working blocks is not delivery-ready.

## Block Purpose Audit

For each remaining block, answer:

- Does it participate in the trade path?
- Does it participate in the risk or position sizing path?
- Does it participate in exit/protection logic?
- Is it an intentional exposed parameter or control?
- Is it an intentional trader-facing visual output?

If all answers are no, remove the block before lifecycle proof. If the answer is unclear, rename or document it, otherwise remove it.

## Required Proof

After cleanup, run the local TSLab proof sequence again. Do not rely on a previous build or authoring-quality result from before cleanup.
