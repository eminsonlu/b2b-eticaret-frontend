'use client';
import { useAuthStore } from '@/stores/authStore';
import React, { useMemo, useState, useEffect } from 'react';
import HomepageChart from '@/components/panel/HomepageChart';
import { DateTime } from 'luxon';

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea';
type DataType = 'orderSales' | 'cartSales';
type TimeRange = 'day' | 'week' | 'month' | 'year' | 'custom';

interface ChartConfig {
  id: string;
  title: string;
  description: string;
  type: ChartType;
  dataType: DataType;
  permission?: string;
  pricePermission?: string;
  timeRange?: TimeRange;
  options?: {
    stacked?: boolean;
    horizontal?: boolean;
    fill?: boolean;
    showLegend?: boolean;
    animationDuration?: number;
    tension?: number;
  };
  getData: () => any;
}

const PanelHomePageContainer = ({ data }: { data: any }) => {
  const { user } = useAuthStore();
  const { orderSales, cartSales } = data;
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const getDatesForRange = (range: TimeRange) => {
    switch(range) {
      case 'day':
        return [DateTime.now().startOf('day'), DateTime.now().endOf('day')];
      case 'week':
        return [DateTime.now().minus({ days: 7 }), DateTime.now()];
      case 'month':
        return [DateTime.now().minus({ days: 30 }), DateTime.now()];
      case 'year':
        return [DateTime.now().startOf('year'), DateTime.now()];
      case 'custom':
        return [DateTime.now().minus({ days: 7 }), DateTime.now()];
      default:
        return [DateTime.now().minus({ days: 7 }), DateTime.now()];
    }
  };

  const getPreviousDatesForRange = (range: TimeRange) => {
    switch(range) {
      case 'day':
        return [DateTime.now().minus({ days: 2 }), DateTime.now().minus({ days: 1 })];
      case 'week':
        return [DateTime.now().minus({ days: 14 }), DateTime.now().minus({ days: 7 })];
      case 'month':
        return [DateTime.now().minus({ days: 60 }), DateTime.now().minus({ days: 30 })];
      case 'year':
        return [DateTime.now().minus({ days: 365 * 2 }), DateTime.now().minus({ days: 365 })];
      case 'custom':
        return [DateTime.now().minus({ days: 14 }), DateTime.now().minus({ days: 7 })];
      default:
        return [DateTime.now().minus({ days: 14 }), DateTime.now().minus({ days: 7 })];
    }
  }
  
  const getFilteredOrderSales = () => {
    const [startDate, endDate] = getDatesForRange(timeRange);
    return orderSales.filter((order: any) => {
      const orderDate = DateTime.fromISO(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };
  
  const getFilteredCartSales = () => {
    const [startDate, endDate] = getDatesForRange(timeRange);
    return cartSales.filter((cart: any) => {
      const cartDate = DateTime.fromISO(cart.createdAt);
      return cartDate >= startDate && cartDate <= endDate;
    });
  };
  
  const getPreviousFilteredOrderSales = () => {
    const [startDate, endDate] = getPreviousDatesForRange(timeRange);
    return orderSales.filter((order: any) => {
      const orderDate = DateTime.fromISO(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }

  const getPreviousFilteredCartSales = () => {
    const [startDate, endDate] = getPreviousDatesForRange(timeRange);
    return cartSales.filter((cart: any) => {
      const cartDate = DateTime.fromISO(cart.createdAt);
      return cartDate >= startDate && cartDate <= endDate;
    });
  }

  const filteredOrderSales = getFilteredOrderSales();
  const filteredCartSales = getFilteredCartSales();

  const previousFilteredOrderSales = getPreviousFilteredOrderSales();
  const previousFilteredCartSales = getPreviousFilteredCartSales();

  const getTotalRevenue = () => {
    return filteredOrderSales.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
  };

  const getOrderCount = () => {
    return filteredOrderSales.length;
  };
  
  const getAverageOrderValue = () => {
    if (filteredOrderSales.length === 0) return 0;
    return getTotalRevenue() / getOrderCount();
  };
  
  const getCartCount = () => {
    return filteredCartSales.length;
  };

  const getPreviousTotalRevenue = () => {
    return previousFilteredOrderSales.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
  };

  const getPreviousOrderCount = () => {
    return previousFilteredOrderSales.length;
  };

  const getPreviousAverageOrderValue = () => {
    if (previousFilteredOrderSales.length === 0) return 0;
    return getPreviousTotalRevenue() / getPreviousOrderCount();
  };

  const getPreviousCartCount = () => {
    return previousFilteredCartSales.length;
  };

  const getComparisonText = (timeRange: TimeRange, startDate?: DateTime, endDate?: DateTime) => {
    switch (timeRange) {
      case 'day':
        return 'geçen güne göre';
      case 'week':
        return 'geçen haftaya göre';
      case 'month':
        return 'geçen aya göre';
      case 'year':
        return 'geçen yıla göre';
      case 'custom':
        if (startDate && endDate) {
          const days = endDate.diff(startDate, 'days').days;
          return `önceki ${Math.round(days)} güne göre`;
        }
        return 'önceki döneme göre';
      default:
        return 'önceki döneme göre';
    }
  };

  const renderPercentageChange = (
    currentValue: number, 
    previousValue: number, 
    timeRange: TimeRange,
    startDate?: DateTime,
    endDate?: DateTime
  ) => {
    const change = previousValue === 0 
      ? (currentValue > 0 ? 100 : 0) 
      : ((currentValue - previousValue) / previousValue) * 100;
    
    const textColorClass = change >= 0 ? 'text-green-500' : 'text-red-500';
    const sign = change >= 0 ? '+' : '';
    const comparisonText = getComparisonText(timeRange, startDate, endDate);
    
    return (
      <div className={`text-xs ${textColorClass} mt-1`}>
        {`${sign}${change.toFixed(1)}% ${comparisonText}`}
      </div>
    );
  };

  const PANEL_CHARTS = useMemo<ChartConfig[]>(() => [
    {
      id: 'revenueOverTime',
      title: 'Satış Geliri',
      description: 'Zaman içindeki satış geliri dağılımı',
      type: 'line',
      dataType: 'orderSales',
      permission: 'order',
      pricePermission: 'order',
      timeRange: timeRange,
      options: {
        fill: true,
        tension: 0.4,
      },
      getData: () => {
        let labels: string[] = [];
        let values: number[] = [];
        let extraData: number[] = []; // previous period data for comparison
        
        if (timeRange === 'day') {
          labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
          values = Array.from({ length: 24 }, (_, hour) => {
            return filteredOrderSales
              .filter((order: any) => DateTime.fromISO(order.createdAt).hour === hour)
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
          });
          
          const yesterday = DateTime.now().minus({ days: 1 });
          extraData = Array.from({ length: 24 }, (_, hour) => {
            return orderSales
              .filter((order: any) => {
                const orderDate = DateTime.fromISO(order.createdAt);
                return orderDate.hasSame(yesterday, 'day') && orderDate.hour === hour;
              })
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
          });
        } else if (timeRange === 'week') {
          const days = Array.from({ length: 7 }, (_, i) => 
            DateTime.now().minus({ days: 6 - i })
          );
          
          labels = days.map(day => day.toFormat('dd/MM'));
          values = days.map(day => {
            return filteredOrderSales
              .filter((order: any) => 
                DateTime.fromISO(order.createdAt).hasSame(day, 'day')
              )
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
          });
          
          const prevDays = Array.from({ length: 7 }, (_, i) => 
            DateTime.now().minus({ days: 13 - i })
          );
          
          extraData = prevDays.map(day => {
            return orderSales
              .filter((order: any) => 
                DateTime.fromISO(order.createdAt).hasSame(day, 'day')
              )
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
          });
        } else if (timeRange === 'month') {
          const numDays = 30;
          const groupSize = 3;
          const numGroups = Math.ceil(numDays / groupSize);
          
          for (let i = 0; i < numGroups; i++) {
            const startDay = numDays - (i + 1) * groupSize + 1;
            const endDay = numDays - i * groupSize;
            const startDate = DateTime.now().minus({ days: endDay - 1 });
            const endDate = DateTime.now().minus({ days: Math.max(0, startDay - 1) });
            
            labels.unshift(`${startDate.toFormat('dd/MM')}-${endDate.toFormat('dd/MM')}`);
            
            const groupRevenue = filteredOrderSales
              .filter((order: any) => {
                const orderDate = DateTime.fromISO(order.createdAt);
                return orderDate >= startDate.startOf('day') && orderDate <= endDate.endOf('day');
              })
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
              
            values.unshift(groupRevenue);
            
            const prevStartDate = startDate.minus({ days: 30 });
            const prevEndDate = endDate.minus({ days: 30 });
            
            const prevGroupRevenue = orderSales
              .filter((order: any) => {
                const orderDate = DateTime.fromISO(order.createdAt);
                return orderDate >= prevStartDate.startOf('day') && orderDate <= prevEndDate.endOf('day');
              })
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
              
            extraData.unshift(prevGroupRevenue);
          }
        } else if (timeRange === 'year') {
          labels = Array.from({ length: 12 }, (_, i) => 
            DateTime.now().set({ month: i + 1 }).toFormat('MMMM')
          );
          
          values = labels.map((_, monthIndex) => {
            return filteredOrderSales
              .filter((order: any) => 
                DateTime.fromISO(order.createdAt).month === monthIndex + 1 &&
                DateTime.fromISO(order.createdAt).year === DateTime.now().year
              )
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
          });
          
          extraData = labels.map((_, monthIndex) => {
            return orderSales
              .filter((order: any) => 
                DateTime.fromISO(order.createdAt).month === monthIndex + 1 &&
                DateTime.fromISO(order.createdAt).year === DateTime.now().year - 1
              )
              .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
          });
        }
        
        return {
          labels,
          values,
          extraData,
          colors: ['rgba(251, 171, 126, 0.7)']
        };
      }
    },
    {
      id: 'orderSalesByStatus',
      title: 'Siparişler (Duruma Göre)',
      description: 'Sipariş durumlarına göre dağılım',
      type: 'pie',
      dataType: 'orderSales',
      permission: 'order',
      timeRange: timeRange,
      getData: () => {
        const statusCounts = {
          'AWAITING_USER_ACTION': 0,
          'SHIPPED': 0,
          'DELIVERED': 0,
          'CANCELED': 0,
        };
        
        filteredOrderSales.forEach((order: any) => {
          if (statusCounts[order.status as keyof typeof statusCounts] !== undefined) {
            statusCounts[order.status as keyof typeof statusCounts]++;
          }
        });
        
        return {
          labels: [
            'Bekleyen',
            'Kargoda',
            'Teslim Edildi',
            'İptal Edildi'
          ],
          values: [
            statusCounts['AWAITING_USER_ACTION'],
            statusCounts['SHIPPED'],
            statusCounts['DELIVERED'],
            statusCounts['CANCELED']
          ],
          colors: ['#fbab7e', '#4dabf7', '#40c057', '#fa5252']
        };
      }
    },
    {
      id: 'orderSalesByPaymentMethod',
      title: 'Ödeme Yöntemleri',
      description: 'Ödeme yöntemlerine göre dağılım',
      type: 'doughnut',
      dataType: 'orderSales',
      permission: 'order',
      timeRange: timeRange,
      getData: () => {
        const paymentMethods = {
          'CREDIT_CARD': 0,
          'BANK_TRANSFER': 0
        };
        
        filteredOrderSales.forEach((order: any) => {
          if (paymentMethods[order.paymentMethod as keyof typeof paymentMethods] !== undefined) {
            paymentMethods[order.paymentMethod as keyof typeof paymentMethods]++;
          }
        });
        
        return {
          labels: ['Kredi Kartı', 'Havale/EFT'],
          values: [
            paymentMethods['CREDIT_CARD'],
            paymentMethods['BANK_TRANSFER']
          ],
          colors: ['#4c6ef5', '#15aabf']
        };
      }
    },
    {
      id: 'orderSalesByPaymentStatus',
      title: 'Ödeme Durumları',
      description: 'Ödeme durumuna göre dağılım',
      type: 'polarArea',
      dataType: 'orderSales',
      permission: 'order',
      timeRange: timeRange,
      getData: () => {
        const paymentStatus = {
          'PENDING': 0,
          'PAID': 0,
          'CANCELED': 0,
          'FAILED': 0
        };
        
        filteredOrderSales.forEach((order: any) => {
          if (paymentStatus[order.paymentStatus as keyof typeof paymentStatus] !== undefined) {
            paymentStatus[order.paymentStatus as keyof typeof paymentStatus]++;
          }
        });
        
        return {
          labels: ['Bekliyor', 'Ödendi', 'İptal Edildi', 'Başarısız'],
          values: [
            paymentStatus['PENDING'],
            paymentStatus['PAID'],
            paymentStatus['CANCELED'],
            paymentStatus['FAILED']
          ],
          colors: ['#fab005', '#51cf66', '#fa5252', '#ff922b']
        };
      }
    },
    {
      id: 'orderValueDistribution',
      title: 'Sipariş Değeri Dağılımı',
      description: 'Sipariş tutarlarının dağılımı',
      type: 'bar',
      dataType: 'orderSales',
      permission: 'order',
      pricePermission: 'order',
      timeRange: timeRange,
      getData: () => {
        const ranges = [
          { min: 0, max: 100, label: '0-100₺' },
          { min: 100, max: 500, label: '100-500₺' },
          { min: 500, max: 1000, label: '500-1000₺' },
          { min: 1000, max: 2000, label: '1000-2000₺' },
          { min: 2000, max: 5000, label: '2000-5000₺' },
          { min: 5000, max: Infinity, label: '5000₺+' }
        ];
        
        const distribution = ranges.map(range => {
          return filteredOrderSales.filter((order: any) => 
            order.total >= range.min && order.total < range.max
          ).length;
        });
        
        return {
          labels: ranges.map(r => r.label),
          values: distribution,
          colors: ['#4c6ef5']
        };
      }
    },
    {
      id: 'cartCounts',
      title: 'Sepet Sayısı',
      description: 'Sepet sayısı',
      type: 'bar',
      dataType: 'cartSales',
      timeRange: timeRange,
      getData: () => {
        return {
          labels: ['Sepet Sayısı'],
          values: [filteredCartSales.length],
          colors: ['#15aabf']
        };
      }
    },
    {
      id: 'topProducts',
      title: 'En Çok İlgi Gören Ürünler',
      description: 'Sepete en çok eklenen ürünler',
      type: 'bar',
      dataType: 'cartSales',
      timeRange: timeRange,
      options: {
        horizontal: true
      },
      getData: () => {
        const productCounts: Record<string, number> = {};
        
        filteredCartSales.forEach((item: any) => {
          const title = item.product?.title || 'Bilinmeyen Ürün';
          if (!productCounts[title]) {
            productCounts[title] = 0;
          }
          productCounts[title] += item.quantity;
        });
        
        const sortedProducts = Object.entries(productCounts)
          .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
          .slice(0, 5);
        
        return {
          labels: sortedProducts.map(([title]) => title),
          values: sortedProducts.map(([, count]) => count as number),
          colors: ['#15aabf']
        };
      }
    },
    {
      id: 'hourlyDistribution',
      title: 'Saatlik Sipariş Dağılımı',
      description: 'Gün içinde sipariş saatlerine göre dağılım',
      type: 'bar',
      dataType: 'orderSales',
      permission: 'order',
      timeRange: timeRange,
      getData: () => {
        const hourlyData = Array(24).fill(0);
        
        filteredOrderSales.forEach((order: any) => {
          const hour = DateTime.fromISO(order.createdAt).hour;
          hourlyData[hour]++;
        });
        
        return {
          labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          values: hourlyData,
          colors: ['#fbab7e']
        };
      }
    },
    {
      id: 'weekdayDistribution',
      title: 'Haftalık Sipariş Dağılımı',
      description: 'Haftanın günlerine göre sipariş dağılımı',
      type: 'bar',
      dataType: 'orderSales',
      permission: 'order',
      timeRange: timeRange,
      getData: () => {
        const weekdayLabels = [
          'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'
        ];
        const weekdayCounts = Array(7).fill(0);
        
        filteredOrderSales.forEach((order: any) => {
          const weekday = DateTime.fromISO(order.createdAt).weekday - 1;
          weekdayCounts[weekday]++;
        });
        
        return {
          labels: weekdayLabels,
          values: weekdayCounts,
          colors: ['#cc5de8']
        };
      }
    }
  ], [filteredOrderSales, filteredCartSales, timeRange]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Panele Hoşgeldiniz, <strong>{user?.firstName}</strong>
      </h1>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'day' ? 'bg-primary-400 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Bugün
          </button>
          <button 
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'week' ? 'bg-primary-400 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Hafta
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'month' ? 'bg-primary-400 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Ay
          </button>
          <button 
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 rounded text-sm ${timeRange === 'year' ? 'bg-primary-400 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Yıl
          </button>
        </div>
        
        {/* <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
            <FiFilter size={14} />
            <span>Filtrele</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
            <FiCalendar size={14} />
            <span>Özel Tarih</span>
          </button>
        </div> */}
      </div>
      
      {user?.role?.order?.includes('READ') && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Toplam Gelir</div>
            <div className="text-2xl font-bold mt-1">
              {user?.role?.order?.includes('READ') 
                ? `${getTotalRevenue().toLocaleString('tr-TR')} ₺` 
                : '***'}
            </div>
            {renderPercentageChange(
              getTotalRevenue(), 
              getPreviousTotalRevenue(), 
              timeRange
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Sipariş Sayısı</div>
            <div className="text-2xl font-bold mt-1">{getOrderCount()}</div>
            {renderPercentageChange(
              getOrderCount(), 
              getPreviousOrderCount(), 
              timeRange
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Ortalama Sipariş Değeri</div>
            <div className="text-2xl font-bold mt-1">
              {user?.role?.order?.includes('READ') 
                ? `${getAverageOrderValue().toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺` 
                : '***'}
            </div>
            {renderPercentageChange(
              getAverageOrderValue(), 
              getPreviousAverageOrderValue(), 
              timeRange
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500 text-sm">Sepet Sayısı</div>
            <div className="text-2xl font-bold mt-1">{getCartCount()}</div>
            {renderPercentageChange(
              getCartCount(), 
              getPreviousCartCount(), 
              timeRange
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PANEL_CHARTS.map(chart => (
          <HomepageChart
            key={chart.id}
            title={chart.title}
            description={chart.description}
            type={chart.type}
            dataType={chart.dataType}
            data={chart.getData()}
            permission={chart.permission}
            pricePermission={chart.pricePermission}
            timeRange={chart.timeRange as TimeRange}
            options={chart.options || {}}
          />
        ))}
      </div>
    </div>
  );
};

export default PanelHomePageContainer;