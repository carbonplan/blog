import { FigureCaption } from '@carbonplan/components'
import Figure from './open-lidar-biomass/figure'

export const meta = {
  version: '1.0.0',
  title: 'Using LiDAR to estimate forest biomass',
  authors: ['Cindy Chiao', 'Oriana Chegwidden', 'Joe Hamman'],
  date: '02-16-2022',
  summary:
    'An open source implementation of forest biomass estimation using LiDAR.',
  card: 'open-lidar-biomass',
}

Forests play a key role in the global carbon cycle. Effective policies around forest management in turn require accurate measurement of carbon storage and how carbon varies over space and time. Various methods utilizing remote sensing data have been developed to generate global inventories of forest biomass. However, reproducing and comparing these methods can be a challenge due to insufficiently-detailed method descriptions or the underlying data and software being unavailable.

In this short blog post, we describe our recent effort to reproduce and expand on one method for estimating above ground biomass (AGB) using LiDAR data, and highlight the open source implementation we have shared for other researchers. By promoting more reproducible methods we hope to contribute to the biomass estimation research community.

## Estimating biomass using LiDAR data

Estimating forest carbon begins with understanding a single tree. A ground truth estimate of how much biomass (and thus carbon) is contained in a tree can be obtained by cutting a tree down and weighing it. But that is both damaging and impractical to do systematically in living forests. Instead, researchers have developed allometric equations to estimate biomass less intrusively. These equations link measurements of tree height, stem diameter, and wood density, thereby enabling an estimate of biomass in live, intact trees. Measuring these canopy metrics in the field, however, remains time consuming and labor intensive.

To generate global-scale datasets of AGB in a more cost-effective manner, researchers have turned to remotely-sensed data. For instance, space-mounted LiDAR has been used to measure elevation globally. This data can be processed to derive canopy metrics (e.g. vegetation height) that are predictive of biomass. Researchers can then develop empirical allometric equations that translate LiDAR-based canopy metrics to AGB using collocated ground measurements. These equations have been published for different geographical, bioclimatic, and ecological zones.
Recently, [Harris et al. (2021)](https://doi.org/10.1038/s41558-020-00976-6) synthesized these equations to generate biomass estimates across the globe, and helpfully included in their methods a comprehensive [spreadsheet](https://static-content.springer.com/esm/art%3A10.1038%2Fs41558-020-00976-6/MediaObjects/41558_2020_976_MOESM3_ESM.xlsx) of allometric equations and height metric definitions. Others have combined LiDAR and other remote-sensing products for biomass estimation with broader spatial or more frequent temporal coverage ([Baccini et al., 2017](https://doi.org/10.1126/science.aam5962); [Wang et al., 2021](https://doi.org/10.1038/s41558-021-01027-4), [Duncanson et al, 2022](https://doi.org/10.1016/j.rse.2021.112845)).

<Figure />
<FigureCaption number={1}>
  Example LiDAR return signal, which could result in two different tree heights
  depending on the choice of methods. The y-axis represents distance from the
  satellite where the LiDAR instrument is located. A lower value on the y-axis
  indicates a distance farther from the satellite, and thus closer to the center
  of earth. (Note that for simplicity we show the top of the y-axis as 0. The
  actual distance from the satellite can be calculated by adding ~600,000
  meters). A higher value on the x-axis indicates a larger return signal
  strength at that distance, implying high reflection and more tree surface area
  at that height. The raw LiDAR return data are plotted in dark gray dots and a
  fitted smooth curve is plotted in white. In this example, using either of the
  two definitions of ground peak lead to different calculated magnitudes of{' '}
  <i>Max Vegetation Height</i> (25% less when using alternative ground peak in
  this example). In general, allometric equations relying on{' '}
  <i>Max Vegetation Height</i> as an input would estimate higher biomass (if
  using the yellow ground peak) or lower biomass (if using the pink alternative
  ground peak).{' '}
</FigureCaption>

## Why the details matter

As part of a broader project exploring new biomass estimation methods, we first set out to extend the LiDAR-based biomass estimates from Harris et al. (2021) to include subsequent years. We were struck by how many small choices there were in the analysis process, and how they impacted the results in significant ways.

As an example, consider a common metric: _Max Vegetation Height_. This height is defined as the distance between signal beginning and the ground peak. Multiple definitions of the “ground peak” exist and are widely used in the literature: some define it as the lowest peak (the yellow dashed line in Figure 1, e.g. [Neigh et al. (2013)](https://doi.org/10.1016/j.rse.2013.06.019)); some define it as whichever of the lower two peaks has the greater magnitude (the pink dashed line in Figure 1, e.g. [Yavasli et al. (2016)](https://doi.org/10.1016/j.rsase.2016.11.004)). If using allometric equations that rely on vegetation height to estimate biomass, the latter definition will yield a systematically lower estimate. Despite the fact that choosing a ground peak definition affects biomass estimation results, not all papers specify which choice was made.

Other similar choices abound. For example, do you use the raw LiDAR return (i.e. scatter dots in Figure 1) or do you use a smoothed waveform (i.e. solid line), and if so, which smoothing method do you use? When using smoothing, because height-related metrics are derived directly from the waveform, the choice of smoothing algorithm can have significant impacts. For example, considering the _Max Vegetation Height_ metric discussed above, even with a decision as to which ground peak to use, the choice of smoothing algorithm can change the inferred ground peak height and thus the overall height estimate — and these choices will matter more when the signal-to-noise ratio is lower.

## Why open source

The easiest way to understand these kinds of analysis choices is to look at the code. In that spirit, we’ve assembled [sample AGB data](https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/v1/preprocessed_lidar/) derived from LiDAR returns from the [Geoscience Laser Altimeter System](https://icesat.gsfc.nasa.gov/icesat/glas.php) that flew on the first [ICESat](https://www.nasa.gov/mission_pages/icesat/) mission along with the [Python processing code](https://github.com/carbonplan/trace/tree/main/carbonplan_trace/v1) that generated the AGB data. We have also prepared a sample [Jupyter Notebook](https://github.com/carbonplan/trace/blob/main/notebooks/lidar_blog_sample_notebook.ipynb) that demonstrates how to work with the data and use the analysis routines. Most key processing steps are contained within the [`glas_height_metrics.py`](https://github.com/carbonplan/trace/blob/main/carbonplan_trace/v1/glas_height_metrics.py) and [`glas_allometric_eq.py`](https://github.com/carbonplan/trace/blob/main/carbonplan_trace/v1/glas_allometric_eq.py) modules. These modules translate LiDAR returns into waveforms, derive height metrics, and then feed the calculated height metrics into regionally-specific allometric equations to derive biomass. For now we have implemented these steps within a broader analysis package ([`trace`](https://github.com/carbonplan/trace)), and are sharing them here primarily as a reference implementation for others doing similar work. But we would happily consider splitting them out into a standalone package if that would be of interest.

While LiDAR-derived biomass is often an intermediary product in a larger end-to-end analysis, it is a critical and nuanced step. We hope that the availability of this open source data and code can accelerate future efforts, as well as help users understand and compare different methods. Please [reach out](https://github.com/carbonplan/trace/issues/new/) with questions, contribute to the package, and share what you discover!

## Thanks

CarbonPlan received grant support from WattTime (as part of the [Climate TRACE](https://www.climatetrace.org/)) and NASA (grant no. 19-ACCESS19-0049). [2i2c](https://2i2c.org/) managed our computing environment on AWS where all of our analysis was performed.

We thank [Mary Farina](https://www.woodwellclimate.org/staff/mary-farina/) and [Jon Wang](https://www.jonwangetal.com/) for providing key insights that supported our work on this project.
