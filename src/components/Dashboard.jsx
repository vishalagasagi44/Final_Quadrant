import React, { useEffect, useState, Suspense, lazy } from "react";
import { Card, CardContent, Typography, Grid, Skeleton } from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

// Lazy load the chart components for better performance
const LineChart = lazy(() => import('./LineChart'));
const AreaLineChart = lazy(() => import('./AreaLineChart'));
const PieChart = lazy(() => import('./PieChart'));
const BarChart = lazy(() => import('./BarChart'));
const BarChartB = lazy(() => import('./BarChartB'));
const BarChartDis = lazy(() => import('./BarChartDis'));
const DoughnutChart = lazy(() => import('./DoughnutChart'));
const HorizBarChart = lazy(() => import('./HorizBarChart'));

const Dashboard = () => {
  const [data, setData] = useState({
    disposalFees: [],
    weeklyJobs: [],
    weeklyJobsComplete: [],
    weeklyWaste: [],
    toxicSubstances: [],
    wasteCategories: [],
    wasteCollected: [],
    co2Reduction: [],
    ghgReduction: [],
    week4Types: []
  });

  // Fetch data from JSON files (replace with actual API endpoints)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fees, jobs, jobscomplete,wasteweek, substances, categories, collected, co2, ghg, week4] = await Promise.all([
          fetch('/api/disposalFees.json').then(res => res.json()),
          fetch('/api/weeklyData.json').then(res => res.json()),
          fetch('/api/weeklyJobComplete.json').then(res => res.json()),
          fetch('/api/wasteWeek.json').then(res => res.json()),
          fetch('/api/toxicSubstances.json').then(res => res.json()),
          fetch('/api/wasteCategory.json').then(res => res.json()),
          fetch('/api/wasteCollected.json').then(res => res.json()),
          fetch('/api/co2Reduction.json').then(res => res.json()),
          fetch('/api/ghgReduction.json').then(res => res.json()),
          fetch('/api/week4.json').then(res => res.json()),
        ]);

        setData({
          disposalFees: fees.disposalFees || [],
          weeklyJobs: jobs.weeks || [],
          weeklyJobsComplete: jobscomplete.weekly_job || [],
          wasteWeek: wasteweek.weekly_waste || [],
          toxicSubstances: substances || [],
          wasteCategories: categories.categories || [],
          wasteCollected: collected.waste || [],
          co2Reduction: co2 || [],
          ghgReduction: ghg || [],
          week4Types: week4.energy_conserved || []
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { disposalFees, weeklyJobs, wasteWeek, weeklyJobsComplete, toxicSubstances, wasteCategories, wasteCollected, co2Reduction, ghgReduction,week4Types } = data;
  return (
    <div className="p-6">
      <Grid container spacing={1} display={"flex"} padding={'20px'} flexDirection={"row"} justifyContent="space-between">
        {/* First Row: Average Disposal Fees and Number of Jobs Fulfilled */}
        <Grid container spacing={1} display={"flex"} md={4} height={'20%'} flexDirection={"row"}>
          <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: 'auto', marginBottom: '10px', boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', mt: 1.5 }}>Average Disposal Fees</Typography>
              <Typography variant="h6" sx={{ color: 'green', mt: 2 }}>
                {disposalFees?.length === 0 ? <Skeleton width="80%" /> :(disposalFees?.reduce((a, b) => a + b, 0) / disposalFees.length || 0).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>

          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: 'auto', marginBottom: '10px', boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center', flexGrow: 1, padding: '10px' }}>
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', mt: 2 }}>Number of Jobs Fulfilled</Typography>
              <Typography variant="h6" sx={{ color: 'blue', mt: 2 }}>
                {weeklyJobs?.length === 0 ? <Skeleton width="80%" /> :weeklyJobs?.reduce((a, b) => a + b.jobsCompleted, 0) || 0}
              </Typography>
            </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12} height={'40%'}  sm={12} md={12}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent sx={{ flexGrow: 1, padding: '10px' }}>
                <Typography variant="h6" sx={{ fontSize: '14px', textAlign: 'Left', fontWeight: 'bold',  mb: 2 }}>
                  Total Volume of Waste Collected (kg)
                </Typography>
            
                  <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
                  <BarChart
                    data={{
                      labels: wasteCollected?.map(item => item.type) || [],
                      datasets: [
                        {
                          label: "Volume (kg)",
                          data: wasteCollected?.map(item => item.volume) || [],
                          backgroundColor: "rgba(75, 192, 192, 0.6)",
                          borderColor: "rgba(75, 192, 192, 1)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                  </Suspense>
              
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} height="40%">
  <Card sx={{ boxShadow: 3 }}>
    <CardContent sx={{ padding: "10px", mb: 6 }}>
      <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
        <LineChart
          title="Reduction in CO₂ and Greenhouse Gas Emissions Across Weeks"
          data={co2Reduction?.map((item) => ({ y: item.co2Reduction })) || []}
          secondData={
            ghgReduction?.map((item) => ({ y: item.ghgReduction })) || []
          }
          labels={co2Reduction?.map((item) => item.week) || []}
        />
      </Suspense>
    </CardContent>
  </Card>
</Grid>

        </Grid>

        {/* Second Row: Waste Category Distribution and Toxic Substances Disposed (Stacked) */}
        <Grid container spacing={2} item xs={12} sm={12} md={4}>
  {/* Toxic Substances Disposed */}
  <Grid item xs={12}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', boxShadow: 3 }}>
      <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
        <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
          <PieChart
            title="Percentage of Toxic Substances Disposed"
            data={
              toxicSubstances?.map((item) => ({
                type: item.serviceType,
                percentage: item.disposedKg,
              })) || []
            }
          />
        </Suspense>
      </CardContent>
    </Card>
  </Grid>

  {/* Waste Category Distribution */}
  <Grid item xs={12}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3 }}>
      <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
        <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
          <DoughnutChart
            title="percentage of Waste Category Distribution"
            data={
              wasteCategories?.map((item) => ({
                type: item.category,
                percentage: item.percentage,
              })) || []
            }
          />
        </Suspense>
      </CardContent>
    </Card>
  </Grid>

  {/* Distribution of Disposal Fees */}
  <Grid item xs={12}>
  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3 }}>
    <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
     
      <div style={{ position: 'relative', height: '300px' }}>
        <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
        <BarChartDis
  title="Disposal Fees Analysis"
  data={{
    labels: disposalFees?.map((_, i) => ` ${i + 1}`) || [], // Label for x-axis
    datasets: [
      {
        label: 'Fees (₹)',
        data: disposalFees || [], // Actual disposal fees data for y-axis
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'Average Fees (₹)',
        data: disposalFees && disposalFees.length > 0
        ? Array(disposalFees.length).fill(
            disposalFees.reduce((sum, val) => sum + val, 0) / disposalFees.length
          )
        : [], // Fill with the average fee if data is available
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        type: 'line', // Render as line to highlight average
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Fees (₹)' },
        ticks: {
          callback: function (value) {
            return `₹${value.toFixed(2)}`; // Format y-axis labels with currency
          },
        },
      },
      y: {
        title: { display: true, text: 'Entries' },
      },
    },
  }}
/>

        </Suspense>
      </div>
    </CardContent>
  </Card>
</Grid>

</Grid>

        {/* Other Cards: CO₂ & GHG Reduction, Waste Collected, Disposal Fees */}
        <Grid container spacing={1} display={"flex"} md={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: 'auto', boxShadow: 3 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
                  <AreaLineChart
                    title="Weekly Job Completion Trend"
                    data={weeklyJobsComplete?.map(item => ({ y: item.jobs_completed })) || []}
                    labels={weeklyJobsComplete?.map(item => item.week) || []}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1, padding: '10px',height: 'auto' }}>
              <Typography variant="h6" sx={{fontSize:'14px', fontWeight: 'bold', textAlign: 'left', mb: 2 }}>
                Total Volume of Waste Collected (kg)
              </Typography>
           
<Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
  <BarChartB
    data={{
      labels: wasteWeek?.map(item => item.week) || [],  // Week labels
      datasets: [
        {
          label: "Large Waste",
          data: wasteWeek?.map(item => item.large || 0) || [],  // Data for large waste
          backgroundColor: "rgba(255, 99, 132, 0.6)",  // Color for large waste
          stack: "stack1",  // Ensure stacking order
        },
        {
          label: "Medium Waste",
          data: wasteWeek?.map(item => item.medium || 0) || [],  // Data for medium waste
          backgroundColor: "rgba(54, 162, 235, 0.6)",  // Color for medium waste
          stack: "stack1",  // Ensure stacking order
        },
        {
          label: "Small Waste",
          data: wasteWeek?.map(item => item.small || 0) || [],  // Data for small waste
          backgroundColor: "rgba(75, 192, 192, 0.6)",  // Color for small waste
          stack: "stack1",  // Ensure stacking order
        },
      ],
    }}
  />
</Suspense>
   
            </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} >
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1, padding: '10px',height: 'auto' }}>
              <Typography variant="h6" sx={{fontSize: '14px', fontWeight: 'bold', textAlign: 'left', mb: 2 }}>
                Energy Conserved by each Service type in Week 4</Typography>
           
                <Suspense fallback={<Skeleton variant="rectangular" width={'100%'} height={'300px'} />}>
                <HorizBarChart
                    data={{
                      labels: week4Types?.map(item => item.service_type) || [],  // Service type names
                      datasets: [
                        {
                          label: "Energy Conserved (kWh)",
                          data: week4Types?.map(item => item.energy_conserved_kWh) || [],  // Energy conserved values
                          backgroundColor: "rgba(75, 192, 192, 0.6)",  // Color for the bars
                          borderColor: "rgba(75, 192, 192, 1)",  // Border color for the bars
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />

                </Suspense>
             
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
