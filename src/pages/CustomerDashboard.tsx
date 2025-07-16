import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [myOrders] = useState([
    {
      id: "1",
      title: "Тайские фрукты",
      description: "Дуриан, манго, рамбутан - свежие фрукты",
      route: "Бангкок → Москва",
      weight: "3 кг",
      reward: 4000,
      commission: 1000,
      total: 5000,
      status: "in_escrow",
      travelerName: "Елена С.",
      travelerRating: 4.9,
      createdAt: "2024-02-10",
      deliveryDate: "2024-02-15"
    },
    {
      id: "2",
      title: "Итальянские сувениры",
      description: "Муранское стекло, маски из Венеции",
      route: "Венеция → Москва",
      weight: "2 кг",
      reward: 3000,
      commission: 750,
      total: 3750,
      status: "searching",
      createdAt: "2024-02-12",
      applications: 3
    },
    {
      id: "3",
      title: "Французские духи",
      description: "Оригинальные духи Chanel",
      route: "Париж → Санкт-Петербург",
      weight: "0.5 кг",
      reward: 2500,
      commission: 625,
      total: 3125,
      status: "completed",
      travelerName: "Александр К.",
      travelerRating: 4.8,
      completedAt: "2024-02-05"
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "searching":
        return <Badge variant="secondary">Поиск попутчика</Badge>;
      case "in_escrow":
        return <Badge variant="default">В escrow</Badge>;
      case "in_transit":
        return <Badge className="bg-blue-500">В пути</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Выполнен</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Отменен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const activeOrders = myOrders.filter(order => order.status !== "completed" && order.status !== "cancelled");
  const totalInEscrow = myOrders.filter(order => order.status === "in_escrow").reduce((sum, order) => sum + order.total, 0);

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
                <p className="text-sm text-gray-500">Заказчик</p>
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
            Управляйте своими заказами и отправками в личном кабинете
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Package" size={20} className="text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{myOrders.length}</p>
                  <p className="text-sm text-gray-600">Всего заказов</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{activeOrders.length}</p>
                  <p className="text-sm text-gray-600">Активные</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-green-500" />
                <div>
                  <p className="text-2xl font-bold">
                    {myOrders.filter(order => order.status === "completed").length}
                  </p>
                  <p className="text-sm text-gray-600">Выполнено</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={20} className="text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{totalInEscrow.toLocaleString()}₽</p>
                  <p className="text-sm text-gray-600">В escrow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Мои заказы</TabsTrigger>
            <TabsTrigger value="search">Поиск попутчиков</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Мои заказы</h2>
              <Link to="/create-order">
                <Button>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать заказ
                </Button>
              </Link>
            </div>

            <div className="grid gap-6">
              {myOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{order.title}</span>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Icon name="MapPin" size={14} />
                              <span>{order.route}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Weight" size={14} />
                              <span>{order.weight}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Calendar" size={14} />
                              <span>{order.createdAt}</span>
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{order.description}</p>
                    
                    {order.travelerName && (
                      <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{order.travelerName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{order.travelerName}</p>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={14} className="text-yellow-500" />
                            <span className="text-sm">{order.travelerRating}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageCircle" size={14} className="mr-1" />
                          Связаться
                        </Button>
                      </div>
                    )}

                    {order.status === "searching" && order.applications && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          Получено {order.applications} заявок от путешественников
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Просмотреть заявки
                        </Button>
                      </div>
                    )}

                    {order.status === "in_escrow" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Доставка до {order.deliveryDate}</span>
                          <span>Средства в escrow</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">
                          Вознаграждение: {order.reward.toLocaleString()}₽
                        </div>
                        <div className="text-sm text-gray-600">
                          Комиссия (25%): {order.commission.toLocaleString()}₽
                        </div>
                        <div className="font-bold">
                          Итого: {order.total.toLocaleString()}₽
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/order/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Icon name="Eye" size={14} className="mr-1" />
                            Подробнее
                          </Button>
                        </Link>
                        {order.status === "searching" && (
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={14} className="mr-1" />
                            Редактировать
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Поиск попутчиков</h2>
              <Link to="/search-flights">
                <Button>
                  <Icon name="Search" size={16} className="mr-2" />
                  Найти рейсы
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Быстрый поиск</CardTitle>
                <CardDescription>
                  Найдите попутчиков для ваших маршрутов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Откуда</label>
                    <input
                      type="text"
                      placeholder="Город отправления"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Куда</label>
                    <input
                      type="text"
                      placeholder="Город назначения"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Дата</label>
                    <input
                      type="date"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      <Icon name="Search" size={16} className="mr-2" />
                      Найти
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-12 text-gray-500">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Используйте поиск выше, чтобы найти попутчиков для ваших заказов</p>
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
                    <label className="text-sm font-medium">Тип аккаунта</label>
                    <p className="text-gray-900">Заказчик</p>
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

            <Card>
              <CardHeader>
                <CardTitle>Статистика заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{myOrders.length}</p>
                    <p className="text-sm text-gray-600">Всего заказов</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {myOrders.filter(order => order.status === "completed").length}
                    </p>
                    <p className="text-sm text-gray-600">Выполнено</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{activeOrders.length}</p>
                    <p className="text-sm text-gray-600">В процессе</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {myOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}₽
                    </p>
                    <p className="text-sm text-gray-600">Потрачено</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;