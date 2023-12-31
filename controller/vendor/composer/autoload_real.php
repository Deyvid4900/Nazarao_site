<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit6d30c1abe0c0bf6f1164d7ca30682c42
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInit6d30c1abe0c0bf6f1164d7ca30682c42', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit6d30c1abe0c0bf6f1164d7ca30682c42', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit6d30c1abe0c0bf6f1164d7ca30682c42::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
