import { FigureCaption } from '@carbonplan/components'
import Figure from './open-lidar-biomass/figure'

export const meta = {
  version: '1.0.0',
  title: 'Open source LiDAR derived biomass data and code',
  authors: ['Cindy Chiao', 'Oriana Chegwidden', 'Joe Hamman'],
  date: '02-15-2022',
  summary: 'An open source implementation of forest biomass estimation using LiDAR.',
}

Forests play a key role in the global carbon cycle. Effective policies around forest management in turn require accurate measurement of carbon storage and how it varies over space and time. Various methods utilizing remote sensing data have been developed to generate global inventories of forest biomass. Reproduction and comparison of these methods, however, can be a challenge, due to availability of sufficiently-detailed method descriptions and underlying data and code.

In this short blog post, we describe our recent effort to reproduce and expand on one particular method for estimating above ground biomass (AGB) using LiDAR data, and highlight the open source implementation we have shared for other researchers. By promoting more reproducible methods we hope to contribute to the biomass estimation research community.

## Estimating biomass using LiDAR data 

Estimating forest carbon begins with understanding a single tree. A ground truth of how much biomass (and thus carbon) is contained in a tree can be obtained by cutting a tree down and weighing it — but that’s of course impractical to do systematically in living forests. Instead, allometric equations — quantitative relationships that link measurements of tree height, stem diameter, and wood density — were developed to estimate biomass less intrusively. But field measurements of these canopy metrics are still time consuming and labor intensive, so researchers have further turned to remotely sensed data to generate large-scale inventories at global scale in a cost-effective manner. In particular, space-mounted LiDAR data has been used to measure global elevation. This data can also be processed to derive canopy metrics that are predictive of biomass (e.g. vegetation height). Researchers can then develop empirical allometric equations that translate LiDAR based canopy metrics to AGB using collocated ground measurements. These equations have been published for different geographical, bioclimatic, and ecological zones. More recently, Harris et al. (2021) synthesized these equations to generate biomass estimates across the globe, and others have combined LiDAR and other remote-sensing products for biomass estimation with broader spatial or more frequent temporal coverage (Baccini et al., 2017; Wang et al., 2021, Duncanson et al, 2022). 

<Figure />

<FigureCaption number={1}>
Example LiDAR return signal and the idealized interpretation of the vegetation represented. The y-axis represents distance from the satellite where the LiDAR instrument is located. Lower on the y axis indicates larger distance from the satellite, and thus closer to the center of earth. A higher value on the x-axis indicates a larger return signal strength at that distance, implying high reflection and more surface area at that height. The raw LiDAR return data are plotted in dark gray dots and the smoothed curves are plotted in white. In this example, the two definitions of ground peak lead to very different magnitudes of Max Vegetation Height calculated (25% less when using alternative ground peak in this example). As a result, allometric equations that use Max Vegetation Height as the main input to derive biomass, these two different definitions of ground peak would result in two very different biomass estimates.
</FigureCaption>

## Why the details matter 

As part of a broader project exploring new biomass estimation methods, we first set out to extend the LiDAR-based biomass estimates from Harris et al. (2021) to include subsequent years. We were struck by how many small choices there were in the analysis process, and how they impacted the results in significant ways.

As an example, consider a common metric: _Max Vegetation Height_. This height is defined as “the distance between signal beginning and the ground peak”. Multiple definitions of the “ground peak” exist and are widely used in the literature: some define it as the lowest peak (the yellow dashed line in Figure 1); some define it as whichever of the lowest two peaks with the greater magnitude (the pink dashed line in Figure 1). Using the latter definition will yield a systematically lower estimate of vegetation height and thus lower biomass estimates compared to the former when using allometric equations reliant on vegetation height. Choosing the correct ground peak definition thus materially affects the accuracy of the study. However, not all papers clearly state the definition used, potentially causing confusion for future researchers.

Other similar choices abound. Do you use the raw LiDAR waveform (i.e. scatter points in Figure 1) or do you use the smoothed waveform (i.e. solid line)? What method do you use to generate the smoothed waveform? The green lines on Figure 1 are positioned at the “start” and “end” of the valid waveform considered, but how are those points defined? 

## Why open source

The easiest way to know the specific choices in an analysis is to look at the code. In that spirit, we’ve assembled sample [LiDAR data](https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/v1/preprocessed_lidar/) and [Python processing code](https://github.com/carbonplan/trace/tree/main/carbonplan_trace/v1) that is available to anyone interested (see the sample [Jupyter notebook](https://github.com/carbonplan/trace/blob/main/notebooks/lidar_blog_sample_notebook.ipynb) on how to load and work with the data and code). 

While LiDAR-derived biomass is often an intermediary product in a larger end-to-end analysis, it is undoubtedly a critical step. We hope that the availability of this data and code can accelerate future efforts, as well as help users understand and compare different methods. Ultimately, we hope this sort of open science approach helps improve the state of forest biomass estimation. Please reach out with questions, contribute to the package, and share what you discover! 

## Thanks

CarbonPlan received grant support from Watttime (as part of the [Climate TRACE](https://www.climatetrace.org/)) and NASA (grant no. 19-ACCESS19-0049). [2i2c](https://2i2c.org/) provided a managed [Pangeo Cloud](https://pangeo.io/cloud.html) computing environment on AWS where all our analysis was performed.

[Mary Farina](https://www.woodwellclimate.org/staff/mary-farina/) and [Jon Wang](https://www.jonwangetal.com/) provided key insights that supported our work on this project.
