import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const SearchFlights = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    weight: "",
    sortBy: "date"
  });

  const [flights] = useState([
    {
      id: "1",
      travelerName: "Елена Сидорова",
      travelerRating: 4.9,
      completedDeliveries: 47,
      route: "Бангкок → Москва",
      fromCity: "Бангкок",
      toCity: "Москва",
      departureDate: "2024-02-15",
      arrivalDate: "2024-02-16",
      airline: "Thai Airways",
      flightNumber: "TG975",
      availableCapacity: 3,
      totalCapacity: 5,
      description: "Лечу в отпуск, могу взять фрукты, сувениры, небольшие покупки. Есть опыт доставки дорогих товаров.",
      restrictions: ["Без жидкостей", "Без хрупких предметов"],
      preferredCategories: ["Сувениры", "Продукты питания", "Косметика"],
      averageReward: "750₽/кг",
      responseTime: "< 1 часа"
    },
    {
      id: "2",
      travelerName: "Андрей Петров",
      travelerRating: 4.7,
      completedDeliveries: 23,
      route: "Стамбул → Санкт-Петербург",
      fromCity: "Стамбул",
      toCity: "Санкт-Петербург",
      departureDate: "2024-02-18",
      arrivalDate: "2024-02-18",
      airline: "Turkish Airlines",
      flightNumber: "TK414",
      availableCapacity: 4,
      totalCapacity: 6,
      description: "Командировка. Могу доставить документы, небольшие товары. Ответственный подход к каждому заказу.",
      restrictions: ["Только документы", "Без еды"],
      preferredCategories: ["Документы", "Электроника", "Книги"],
      averageReward: "600₽/кг",
      responseTime: "< 30 мин"
    },
    {
      id: "3",
      travelerName: "Мария Иванова",
      travelerRating: 4.8,
      completedDeliveries: 35,
      route: "Париж → Москва",
      fromCity: "Париж",
      toCity: "Москва",
      departureDate: "2024-02-20",
      arrivalDate: "2024-02-20",
      airline: "Air France",
      flightNumber: "AF1054",
      availableCapacity: 2,
      totalCapacity: 4,
      description: "Частые полеты по работе. Специализируюсь на косметике и парфюмерии из Франции.",
      restrictions: ["Без электроники"],
      preferredCategories: ["Косметика", "Одежда", "Лекарства"],
      averageReward: "900₽/кг",
      responseTime: "< 2 часа"
    },
    {
      id: "4",
      travelerName: "Дмитрий Козлов",
      travelerRating: 4.6,
      completedDeliveries: 18,
      route: "Дубай → Екатеринбург",
      fromCity: "Дубай",
      toCity: "Екатеринбург",
      departureDate: "2024-02-22",
      arrivalDate: "2024-02-23",
      airline: "Emirates",
      flightNumber: "EK176",
      availableCapacity: 6,
      totalCapacity: 8,
      description: "Регулярно летаю в ОАЭ по бизнесу. Большой опыт доставки товаров из duty free.",
      restrictions: ["Без жидкостей"],
      preferredCategories: ["Электроника", "Косметика", "Сувениры"],
      averageReward: "800₽/кг",
      responseTime: "< 4 часа"
    }
  ]);

  const [filteredFlights, setFilteredFlights] = useState(flights);

  const handleSearch = () => {
    let filtered = flights;

    if (searchParams.from) {
      filtered = filtered.filter(flight => 
        flight.fromCity.toLowerCase().includes(searchParams.from.toLowerCase())
      );
    }

    if (searchParams.to) {
      filtered = filtered.filter(flight => 
        flight.toCity.toLowerCase().includes(searchParams.to.toLowerCase())
      );
    }

    if (searchParams.date) {
      filtered = filtered.filter(flight => flight.departureDate === searchParams.date);
    }

    if (searchParams.weight) {
      const requiredWeight = parseFloat(searchParams.weight);
      filtered = filtered.filter(flight => flight.availableCapacity >= requiredWeight);
    }

    // Сортировка
    switch (searchParams.sortBy) {
      case "rating":
        filtered.sort((a, b) => b.travelerRating - a.travelerRating);
        break;
      case "capacity":
        filtered.sort((a, b) => b.availableCapacity - a.availableCapacity);
        break;
      case "experience":
        filtered.sort((a, b) => b.completedDeliveries - a.completedDeliveries);
        break;
      case "date":
      default:
        filtered.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
        break;
    }

    setFilteredFlights(filtered);
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
            <Link to="/customer-dashboard">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к заказам
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Поиск попутчиков</h1>
          <p className="text-gray-600">
            Найдите попутчиков для доставки ваших посылок
          </p>
        </div>

        {/* Форма поиска */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Параметры поиска</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="from">Откуда</Label>
                <Input
                  id="from"
                  placeholder="Город отправления"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="to">Куда</Label>
                <Input
                  id="to"
                  placeholder="Город назначения"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="date">Дата</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="weight">Вес, кг</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={searchParams.weight}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="sortBy">Сортировка</Label>
                <Select
                  value={searchParams.sortBy}
                  onValueChange={(value) => setSearchParams(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">По дате</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="capacity">По вместимости</SelectItem>
                    <SelectItem value="experience">По опыту</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Button onClick={handleSearch}>
                <Icon name="Search" size={16} className="mr-2" />
                Найти попутчиков
              </Button>
              <div className="text-sm text-gray-600">
                Найдено рейсов: {filteredFlights.length}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Результаты поиска */}
        <div className="space-y-6">
          {filteredFlights.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Попутчики не найдены
                </h3>
                <p className="text-gray-600 mb-4">
                  Попробуйте изменить параметры поиска или создайте заказ
                </p>
                <Link to="/create-order">
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать заказ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredFlights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>{flight.travelerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{flight.travelerName}</span>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={16} className="text-yellow-500" />
                            <span className="text-sm font-normal">{flight.travelerRating}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {flight.completedDeliveries} выполненных доставок • Отвечает {flight.responseTime}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary mb-1">{flight.route}</div>
                      <div className="text-sm text-gray-600">
                        {flight.airline} {flight.flightNumber}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Calendar" size={16} className="text-gray-500" />
                        <span className="text-sm">
                          {flight.departureDate} - {flight.arrivalDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Weight" size={16} className="text-gray-500" />
                        <span className="text-sm">
                          Доступно: {flight.availableCapacity} из {flight.totalCapacity} кг
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="DollarSign" size={16} className="text-green-500" />
                        <span className="text-sm font-medium">{flight.averageReward}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{flight.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-600">Ограничения:</span>
                      {flight.restrictions.map((restriction, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-600">Предпочитает:</span>
                      {flight.preferredCategories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Рейтинг: {flight.travelerRating}</span>
                      <span>Доставок: {flight.completedDeliveries}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        Написать
                      </Button>
                      <Button size="sm">
                        <Icon name="Send" size={14} className="mr-1" />
                        Сделать заказ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {filteredFlights.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Не нашли подходящего попутчика?
            </p>
            <Link to="/create-order">
              <Button variant="outline">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать заказ
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFlights;