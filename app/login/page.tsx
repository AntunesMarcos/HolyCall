"use client"

import { useState } from "react"
import {
    Mail,
    Lock,
    ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 2000)
    }

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: "url('/igrejaLourdes.jpg')" }}
        >
            {/* Overlay para escurecer o fundo e ajudar na leitura */}
            <div className="absolute inset-0 bg-black/50" />

            <div className="w-full max-w-[400px] space-y-6 z-10">
                {/* Logo & Header fora do Card */}
                <Card>
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <div className="w-56 h-56 rounded-xl flex items-center justify-center mb-2  p-2">
                            <Avatar className="w-full h-full rounded-none">
                                <AvatarImage src="/logo-basilica.png" className="object-contain" />
                            </Avatar>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                            Bem-vindo ao HolyCall
                        </h1>
                        <p className="text-sm text-gray-800">
                            Sistema de chamada da Crisma - Basílica de Lourdes
                        </p>
                    </div>
                    <div className="pt-8 pb-4">
                        <p className="text-sm font-bold text-center text-gray-800">
                            Entre com suas credenciais
                        </p>
                    </div>

                    <form onSubmit={onSubmit}>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail:</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nome@exemplo.com"
                                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Senha:</Label>

                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        id="password"
                                        type="password"
                                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                                        required
                                    />
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-gray-800 hover:text-gray-600 font-medium"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none text-gray-800 cursor-pointer"
                                >
                                    Lembrar de mim
                                </label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button
                                className="w-full hover:text-white-700 text-white transition-all shadow-md"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Entrando..." : "Entrar no Sistema"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>


            </div>
        </div>
    )
}