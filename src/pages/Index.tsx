import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Plane" size={28} className="text-primary" />
            <span className="text-xl font-bold text-gray-900">Попутчик</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">О сервисе</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">Как работает</a>
            <a href="#reviews" className="text-gray-600 hover:text-primary transition-colors">Отзывы</a>
            <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-600">Войти</Button>
            <Button className="bg-primary hover:bg-primary/90">Регистрация</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Доставка посылок по всему миру с{" "}
              <span className="text-primary">попутными рейсами</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Быстрее, дешевле и надежнее традиционных служб доставки. 
              Отправляйте посылки с путешественниками в любую точку мира.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить посылку
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                <Icon name="Plane" size={20} className="mr-2" />
                Стать попутчиком
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1-3 дня</div>
                <p className="text-gray-600">Средняя скорость доставки</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <p className="text-gray-600">Экономия на доставке</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">195</div>
                <p className="text-gray-600">Стран доступны</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Как работает Попутчик</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Наш сервис делает доставку проще, быстрее и экономичнее. 
              Всего несколько шагов - и ваша посылка уже в пути!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FileText" size={32} className="text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <CardTitle className="text-lg">Разместите запрос</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Укажите город отправления и назначения, размеры и вес посылки, 
                  а также желаемые сроки доставки.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-green-600" />
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <CardTitle className="text-lg">Подбор попутчиков</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Наша система анализирует расписание авиарейсов и находит 
                  путешественников, летящих в нужном направлении.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={32} className="text-purple-600" />
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <CardTitle className="text-lg">Выбор попутчика</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Просматривайте профили доступных попутчиков, их рейтинги 
                  и отзывы, выбирайте подходящего.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-orange-600" />
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <CardTitle className="text-lg">Безопасная доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Попутчик забирает посылку, доставляет в пункт назначения 
                  и передает получателю.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Почему выбирают Попутчик</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Zap" size={32} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Скорость</h3>
              <p className="text-gray-600">
                Получите посылку в разы быстрее, чем при использовании традиционных 
                служб доставки международных отправлений.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="DollarSign" size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💰 Экономия</h3>
              <p className="text-gray-600">
                Стоимость доставки часто значительно ниже, чем у крупных логистических 
                компаний благодаря использованию попутных рейсов.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Globe" size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🌍 Глобальный охват</h3>
              <p className="text-gray-600">
                Доставка практически в любую точку мира, куда летают самолеты - 
                даже в удаленные и труднодоступные места.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="RefreshCw" size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🔄 Гибкость</h3>
              <p className="text-gray-600">
                Возможность доставки небольших и нестандартных посылок, 
                которые не берут традиционные службы.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Lock" size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🔒 Безопасность</h3>
              <p className="text-gray-600">
                Все транзакции проходят через нашу платформу, обеспечивая 
                прозрачность и защиту для обеих сторон.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Heart" size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⭐ Сообщество</h3>
              <p className="text-gray-600">
                Становитесь частью глобального сообщества доверенных 
                путешественников и отправителей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">Ольга К.</CardTitle>
                <CardDescription>Москва</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "Невероятно удобный сервис! Отправила документы из Москвы в Торонто 
                  в три раза быстрее и дешевле, чем через DHL. Попутчик оказался 
                  ответственным и доброжелательным человеком."
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">Дмитрий С.</CardTitle>
                <CardDescription>Санкт-Петербург</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "Регулярно пользуюсь сервисом для отправки образцов продукции 
                  клиентам в Европу и Азию. Экономия на логистике составляет около 40%, 
                  а сроки доставки 1-3 дня вместо 5-10."
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <CardTitle className="text-lg">Анна М.</CardTitle>
                <CardDescription>Киев</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "Как путешественник, я зарабатываю дополнительные деньги, 
                  доставляя посылки. Все очень удобно организовано, оплата гарантирована, 
                  а посылки обычно небольшие и легкие."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы отправить посылку?</h2>
          <p className="text-xl mb-8 opacity-90">
            Заполните форму ниже и найдите попутчика для своей посылки уже сегодня!
          </p>
          
          <div className="max-w-md mx-auto bg-white rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <Input 
                  placeholder="Откуда отправляем?" 
                  className="w-full"
                />
              </div>
              <div>
                <Input 
                  placeholder="Куда доставляем?" 
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  placeholder="Вес, кг" 
                  className="w-full"
                />
                <Input 
                  placeholder="Размер" 
                  className="w-full"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                <Icon name="Search" size={20} className="mr-2" />
                Найти попутчика
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Plane" size={24} className="text-primary" />
                <span className="text-xl font-bold">Попутчик</span>
              </div>
              <p className="text-gray-400">
                Доставка посылок по всему миру с попутными авиарейсами. 
                Быстро, дешево, надежно.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Сервис</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О сервисе</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Как работает</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Правила</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Помощь</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Личный кабинет</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Войти</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Регистрация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Мои заказы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Профиль</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Попутчик. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;