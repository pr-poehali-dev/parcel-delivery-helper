import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const TravelerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeFlights] = useState([
    {
      id: "1",
      from: "Бангкок",
      to: "Москва",
      date: "2024-02-15",
      capacity: "5 кг",
      availableCapacity: "3 кг",
      orders: 2,
      status: "active",
      description: "Могу взять фрукты, сувениры, небольшие покупки"
    },
    {
      id: "2", 
      from: "Москва",
      to: "Париж",
      date: "2024-02-20",
      capacity: "3 кг",
      availableCapacity: "3 кг",
      orders: 0,
      status: "active",
      description: "Лечу в командировку, готов помочь с доставкой"
    }
  ]);

  const [orders] = useState([
    {
      id: "1",
      customerName: "Анна К.",
      customerRating: 4.8,
      item: "Тайские фрукты (дуриан, манго)",
      weight: "2 кг",
      reward: 3000,
      commission: 750,
      netReward: 2250,
      status: "accepted",
      pickup: "Central World, Бангкок",
      delivery: "Домодедово, стойка встреч",
      flightId: "1"
    },
    {
      id: "2",
      customerName: "Михаил П.",
      customerRating: 4.9,
      item: "Тайский чай и специи",
      weight: "1 кг",
      reward: 2000,
      commission: 500,
      netReward: 1500,
      status: "pending",
      pickup: "Чатучак маркет, Бангкок",
      delivery: "Адрес в Москве",
      flightId: "1"
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Plane" size={24} className="text-primary" />
            <span className="text-xl font-bold">Попутчик</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">Путешественник</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Добро пожаловать, {user.name}!
          </h1>
          <p className="text-gray-600">
            Управляйте своими рейсами и заказами в личном кабинете
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{user.rating?.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Рейтинг</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={20} className="text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{user.completedOrders}</p>
                  <p className="text-sm text-gray-600">Доставлено</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Plane" size={20} className="text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{activeFlights.length}</p>
                  <p className="text-sm text-gray-600">Активные рейсы</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={20} className="text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {orders.reduce((sum, order) => sum + order.netReward, 0).toLocaleString()}₽
                  </p>
                  <p className="text-sm text-gray-600">К получению</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="flights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flights">Мои рейсы</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="flights" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Мои рейсы</h2>
              <Link to="/create-flight">
                <Button>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить рейс
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {activeFlights.map((flight) => (
                <Card key={flight.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Icon name="MapPin" size={16} />
                          <span>{flight.from} → {flight.to}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>{flight.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Weight" size={14} />
                            <span>{flight.availableCapacity} из {flight.capacity}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant={flight.status === 'active' ? 'default' : 'secondary'}>
                        {flight.status === 'active' ? 'Активный' : 'Неактивный'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{flight.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Заказов: {flight.orders}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр заказов
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Заказы</h2>
            
            <div className="grid gap-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{order.customerName[0]}</AvatarFallback>
                          </Avatar>
                          <span>{order.customerName}</span>
                          <div className="flex items-center space-x-1 ml-2">
                            <Icon name="Star" size={14} className="text-yellow-500" />
                            <span className="text-sm">{order.customerRating}</span>
                          </div>
                        </CardTitle>
                        <CardDescription>{order.item}</CardDescription>
                      </div>
                      <Badge variant={order.status === 'accepted' ? 'default' : 'secondary'}>
                        {order.status === 'accepted' ? 'Принят' : 'Ожидает'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Забрать:</p>
                        <p className="font-medium">{order.pickup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Доставить:</p>
                        <p className="font-medium">{order.delivery}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Вес: {order.weight}</span>
                        <div className="text-sm">
                          <span className="text-gray-600">Вознаграждение: </span>
                          <span className="font-bold text-green-600">
                            {order.netReward.toLocaleString()}₽
                          </span>
                          <span className="text-gray-500 ml-1">
                            (из {order.reward.toLocaleString()}₽)
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {order.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline">
                              Отклонить
                            </Button>
                            <Button size="sm">
                              Принять
                            </Button>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <Button size="sm" variant="outline">
                            <Icon name="MessageCircle" size={14} className="mr-1" />
                            Связаться
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Профиль</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Личная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Имя</label>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Рейтинг</label>
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-yellow-500" />
                      <span>{user.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Выполнено заказов</label>
                    <p className="text-gray-900">{user.completedOrders}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TravelerDashboard;