import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const OrderDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const orderData = {
    id: "1",
    title: "Тайские фрукты",
    description: "Дуриан, манго, рамбутан - свежие фрукты из Бангкока. Нужно купить в Central World или на рынке Чатучак.",
    route: "Бангкок → Москва",
    weight: "3 кг",
    dimensions: "40x30x20 см",
    reward: 4000,
    commission: 1000,
    total: 5000,
    status: "in_escrow",
    customerName: "Анна Петрова",
    customerRating: 4.8,
    travelerName: "Елена Сидорова",
    travelerRating: 4.9,
    createdAt: "2024-02-10",
    acceptedAt: "2024-02-11",
    expectedDelivery: "2024-02-15",
    pickupAddress: "Central World Shopping Center, 999/9 Rama I Rd, Патхумван, Bangkok 10330, Thailand",
    deliveryAddress: "Аэропорт Домодедово, стойка встреч, зал прилета",
    contactInfo: "+7 (999) 123-45-67, @annapetrov",
    specialInstructions: "Фрукты должны быть свежими, проверить качество при покупке. Упаковать в картонную коробку.",
    flightDetails: {
      airline: "Thai Airways",
      flightNumber: "TG975",
      departure: "2024-02-15 08:30",
      arrival: "2024-02-15 18:45"
    },
    timeline: [
      {
        date: "2024-02-10",
        status: "created",
        title: "Заказ создан",
        description: "Заказ размещен в системе",
        completed: true
      },
      {
        date: "2024-02-11",
        status: "accepted",
        title: "Принят попутчиком",
        description: "Елена С. приняла заказ",
        completed: true
      },
      {
        date: "2024-02-15",
        status: "in_transit",
        title: "В пути",
        description: "Рейс TG975 вылетел из Бангкока",
        completed: false,
        current: true
      },
      {
        date: "2024-02-15",
        status: "delivered",
        title: "Доставлено",
        description: "Посылка передана получателю",
        completed: false
      }
    ],
    messages: [
      {
        id: "1",
        sender: "traveler",
        senderName: "Елена С.",
        message: "Привет! Я приняла ваш заказ. Завтра утром лечу в Москву, фрукты куплю в Central World как вы просили.",
        timestamp: "2024-02-11 14:30",
        avatar: "Е"
      },
      {
        id: "2", 
        sender: "customer",
        senderName: "Анна П.",
        message: "Отлично! Спасибо большое. Пожалуйста, проверьте качество фруктов при покупке. Встречу в Домодедово.",
        timestamp: "2024-02-11 15:15",
        avatar: "А"
      },
      {
        id: "3",
        sender: "traveler", 
        senderName: "Елена С.",
        message: "Купила фрукты, все свежее и качественное! Завтра утром вылетаю, пришлю номер рейса.",
        timestamp: "2024-02-14 19:45",
        avatar: "Е"
      }
    ]
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "created":
        return <Badge variant="secondary">Создан</Badge>;
      case "searching":
        return <Badge variant="secondary">Поиск попутчика</Badge>;
      case "accepted":
        return <Badge variant="default">Принят</Badge>;
      case "in_escrow":
        return <Badge className="bg-blue-600">В escrow</Badge>;
      case "in_transit":
        return <Badge className="bg-purple-600">В пути</Badge>;
      case "delivered":
        return <Badge className="bg-green-600">Доставлено</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Завершен</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Отменен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
            <Link to={user.role === 'customer' ? '/customer-dashboard' : '/traveler-dashboard'}>
              <Button variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к заказам
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Заказ #{orderData.id}: {orderData.title}
                </h1>
                <p className="text-gray-600">{orderData.route}</p>
              </div>
              {getStatusBadge(orderData.status)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Детали</TabsTrigger>
                  <TabsTrigger value="timeline">Статус</TabsTrigger>
                  <TabsTrigger value="chat">Чат</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Информация о заказе</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Описание</label>
                          <p className="text-gray-900">{orderData.description}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Маршрут</label>
                          <p className="text-gray-900">{orderData.route}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Вес</label>
                          <p className="text-gray-900">{orderData.weight}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Размеры</label>
                          <p className="text-gray-900">{orderData.dimensions}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Адрес получения</label>
                        <p className="text-gray-900">{orderData.pickupAddress}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Адрес доставки</label>
                        <p className="text-gray-900">{orderData.deliveryAddress}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Особые указания</label>
                        <p className="text-gray-900">{orderData.specialInstructions}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Контакты</label>
                        <p className="text-gray-900">{orderData.contactInfo}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Информация о рейсе</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Авиакомпания</label>
                          <p className="text-gray-900">{orderData.flightDetails.airline}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Номер рейса</label>
                          <p className="text-gray-900">{orderData.flightDetails.flightNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Вылет</label>
                          <p className="text-gray-900">{orderData.flightDetails.departure}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Прилет</label>
                          <p className="text-gray-900">{orderData.flightDetails.arrival}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Статус выполнения</CardTitle>
                      <CardDescription>
                        Отслеживание этапов доставки
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Прогресс доставки</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>

                        {orderData.timeline.map((item, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className={`w-3 h-3 rounded-full mt-1.5 ${
                              item.completed 
                                ? "bg-green-500" 
                                : item.current 
                                ? "bg-blue-500" 
                                : "bg-gray-300"
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className={`font-medium ${
                                  item.completed ? "text-green-700" : item.current ? "text-blue-700" : "text-gray-500"
                                }`}>
                                  {item.title}
                                </h4>
                                {item.current && (
                                  <Badge variant="secondary" className="text-xs">Текущий</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{item.description}</p>
                              <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="chat" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Сообщения</CardTitle>
                      <CardDescription>
                        Общение с {user.role === 'customer' ? 'попутчиком' : 'заказчиком'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                        {orderData.messages.map((message) => (
                          <div key={message.id} className={`flex items-start space-x-3 ${
                            (user.role === 'customer' && message.sender === 'customer') ||
                            (user.role === 'traveler' && message.sender === 'traveler')
                              ? 'flex-row-reverse space-x-reverse' 
                              : ''
                          }`}>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{message.avatar}</AvatarFallback>
                            </Avatar>
                            <div className={`flex-1 ${
                              (user.role === 'customer' && message.sender === 'customer') ||
                              (user.role === 'traveler' && message.sender === 'traveler')
                                ? 'text-right'
                                : ''
                            }`}>
                              <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                (user.role === 'customer' && message.sender === 'customer') ||
                                (user.role === 'traveler' && message.sender === 'traveler')
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <p className="text-sm">{message.message}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Напишите сообщение..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                          rows={2}
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          <Icon name="Send" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Участники</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback>{orderData.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{orderData.customerName}</p>
                      <p className="text-sm text-gray-600">Заказчик</p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-yellow-500" />
                        <span className="text-sm">{orderData.customerRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback>{orderData.travelerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{orderData.travelerName}</p>
                      <p className="text-sm text-gray-600">Попутчик</p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-yellow-500" />
                        <span className="text-sm">{orderData.travelerRating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Стоимость</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Вознаграждение:</span>
                    <span className="font-medium">{orderData.reward.toLocaleString()}₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Комиссия (25%):</span>
                    <span className="font-medium">{orderData.commission.toLocaleString()}₽</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span className="text-primary">{orderData.total.toLocaleString()}₽</span>
                    </div>
                  </div>
                  <Alert>
                    <Icon name="Lock" size={16} />
                    <AlertDescription>
                      Средства заморожены в escrow до завершения доставки
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {orderData.status === "in_transit" && user.role === "customer" && (
                    <Button className="w-full" variant="outline">
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Подтвердить получение
                    </Button>
                  )}
                  
                  {orderData.status === "in_transit" && user.role === "traveler" && (
                    <Button className="w-full">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить фото доставки
                    </Button>
                  )}

                  <Button variant="outline" className="w-full">
                    <Icon name="AlertTriangle" size={16} className="mr-2" />
                    Сообщить о проблеме
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;