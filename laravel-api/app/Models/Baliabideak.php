<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Baliabideak
 * 
 * @property int $Id
 * @property string|null $Izena
 * @property string|null $Mota
 * @property int|null $IdJokoa
 * 
 * @property Jokoak|null $jokoak
 *
 * @package App\Models
 */
class Baliabideak extends Model
{
	protected $table = 'baliabideak';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'int',
		'IdJokoa' => 'int'
	];

	protected $fillable = [
		'Izena',
		'Mota',
		'IdJokoa'
	];

	public function jokoak()
	{
		return $this->belongsTo(Jokoak::class, 'IdJokoa');
	}
}
