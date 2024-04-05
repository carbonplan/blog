---
version: 1.0.0
title: California’s shrinking buffer pool
authors:
  - Grayson Badgley
date: 04-05-2024
summary: New data released by the California Air Resources Board shows that California’s forest offset buffer pool has shrunk two quarters in a row.
card: carb-buffer-decline
fileId: 15dZiRTDJRsPBbZZJl68_796yHrT5ACa8S-_BXe6psAw
components:
  - name: BufferBalance
    src: ./buffer-balance.js
---

New data released yesterday by the California Air Resources Board (CARB) shows that California's forest carbon buffer pool shrank by 0.97 million credits, compared to Q4 2023. This marks the second quarter in a row where CARB’s official reporting has shown the buffer pool decreasing in size. In the previous quarter, the buffer pool lost more than 3.4 million credits. The quarterly losses from these official reports from CARB are consistent with our previous attempts to independently track carbon losses on a project-by-project basis.

California’s forest offsets program uses a sort of self-insurance program, called a buffer pool, to insure carbon losses that stem from unexpected events, like wildfire. All projects pay into the pool when they’re issued new credits. The regulator retires credits from the pool when something goes wrong. While we’ve [regularly](https://carbonplan.org/research/offset-project-fire) [covered](https://www.frontiersin.org/articles/10.3389/ffgc.2022.930426/full) [carbon](https://carbonplan.org/blog/bootleg-fire-update) [losses](https://carbonplan.org/blog/buffer-update-two) at the scale of individual projects, this update looks at CARB’s [Compliance Instrument Reports](https://ww2.arb.ca.gov/our-work/programs/cap-and-trade-program/program-data/compliance-instrument-report), which provide an official accounting of the current size of California’s forest offset buffer pool. These data provide additional context about the significance of carbon loss events over the years at a program-wide scale (Figure 1).

<Figure>
  <BufferBalance />
  <FigureCaption number={1}>
    The size of California’s forest offset buffer pool, based on quarterly
    Compliance Instrument Reports released by the California Air Resources
    Board. For much of the program’s history, the buffer pool has steadily
    grown. The two most recent quarters mark a change in that pattern.
  </FigureCaption>
</Figure>

From the program’s outset, California’s buffer pool has steadily grown because the number of new credits added each year has exceeded the number lost. The size of the buffer pool peaked in Q3 2023 with 31.64 million credits. Along the way, California has dipped into the pool, resulting in quarter-to-quarter declines a few times over the years. Those previous declines, however, have tended to be both small and transient. Prior to these last two reports, the largest net quarterly decline occurred back in 2017, when the buffer pool experienced a loss of 0.54 million credits between Q2 and Q3. Despite these blips, the buffer pool has invariably bounced back by the next quarter.

This newest report, however, marks the first time the buffer pool has declined over two consecutive quarters. Around 4.38 million credits were lost over the last two quarters. By comparison, a total of 2.74 million credits were added to the buffer pool in all of 2022 and 2023, combined.

Meanwhile, the buffer pool is already on the hook for additional losses that are still making their way through verification. We estimate that wildfire losses from two projects, [ACR260](https://carbonplan.org/research/offsets-db/projects/acr260) and [ACR255](https://carbonplan.org/research/offsets-db/projects/acr255), will eventually remove around 4.5 million credits from the buffer pool once they have been officially counted. Absent a sudden infusion of credits from new project development, we should expect the buffer pool to continue to shrink in the quarters ahead.

The buffer pool still has more than 27 million credits in the bank. But after a decade of steady growth, these two quarters of decline should serve as a wake up call. The impacts of climate change are expected to get worse and the buffer pool can’t outrun those risks forever.
