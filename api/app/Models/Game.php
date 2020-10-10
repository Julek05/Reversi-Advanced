<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'player_name',
        'level',
        'player_points',
        'computer_points',
        'image_path'
    ];

    const PLAYER = 'Gracz';
    const UPLOAD_PATH = 'public_uploads';
    const UPLOAD_PHOTOS_FOLDER = 'photos';

    const LEVELS_DICTIONARY = [
        'latwy' => 'easy',
        'sredni' => 'middle',
        'trudny' => 'hard'
    ];

    public static function getBestGames(string $level) : Collection
    {
        return self::select('player_name', 'level', 'player_points',
            'computer_points', 'image_path', 'created_at')
            ->where('level', $level)
            ->orderByRaw('player_points - computer_points DESC')
            ->take(10)
            ->get();
    }

    public static function getLastId() : int
    {
        if (self::count() == 0) {
            return 0;
        } else {
            return self::select('id')
                ->orderByDesc('id')
                ->first()
                ->id;
        }
    }
}
